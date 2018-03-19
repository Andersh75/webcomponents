
'use strict';


//TODO: change 'kind' for elements from name-row-element to name-element
var events = (function(){
    var topics = {};
    var hOP = topics.hasOwnProperty;
  
    return {
        subscribe: function (topic, listener) {
            // Create the topic's object if not yet created
            if (!hOP.call(topics, topic)) topics[topic] = [];

            // Add the listener to queue
            var index = topics[topic].push(listener) - 1;

            // Provide handle back for removal of topic
            return {
                remove: function () {
                    delete topics[topic][index];
                }
            };
        },
        publish: function (topic, info) {
            // If the topic doesn't exist, or there's no listeners in queue, just leave
            if (!hOP.call(topics, topic)) return;

            // Cycle through topics queue, fire!
            topics[topic].forEach(function (item) {
                item(info != undefined ? info : {});
            });
        }
    };
})();




//TODO: edit function to not test for 'element'
function addVerticalPositionToElement(db, response) {
    return h.pouch.getAllRows(db)
        .then((rows) => {
            let filteredRows = rows.filter((row) => {
                return h.str.getLastWordFromStringUsingSpliter(row.doc.kind, '-') === 'element';
            });

            if (!h.boolean.isEmpty(filteredRows)) {
                let parentDocsOfFilteredRows = filteredRows.map((filteredRow) => {
                    return h.pouch.getDoc(filteredRow.doc.parentId, db);
                });

                let filteredRowsIds = filteredRows.map((filteredRow) => {
                    return filteredRow.doc._id;
                });

                return Promise.all(parentDocsOfFilteredRows)
                    .then((parentDocs) => {
                        let parentDocsPositions = parentDocs.map((parentDoc) => {
                            return parentDoc.positionV;
                        });

                        return Promise.all(h.arr.mapm((a, x) => {
                            return Object.assign(Object.assign({}, a), x);
                        }, [
                            filteredRowsIds.map(e => {
                                return {
                                    id: e
                                }
                            }),
                            parentDocsPositions.map(e => {
                                return {
                                    position: e
                                }
                            })
                        ]).map(obj => {
                            return h.pouch.editDocByIdAndPut(obj.id, db, [{
                                key: 'positionV',
                                value: obj.position
                            }]);
                        })).then(results => {
                            return response;
                        });
                    });
            } else {
                return response;
            }
        });
}

function updatePositionAddedLast(response, db) {
    return new Promise((resolve, reject) => {

        let docId = response.id;

        return h.pouch.getDoc(docId, db)
            .then((doc) => {
                let previousDocId;
                let position;

                if (h.str.getLastWordFromStringUsingSpliter(doc.kind, '-') === 'row' || h.str.getLastWordFromStringUsingSpliter(doc.kind, '-') === 'section') {
                    previousDocId = doc.previousV;
                    position = 'positionV';
                } else {
                    previousDocId = doc.previousH;
                    position = 'positionH';
                }

                if (previousDocId !== 'first') {
                    return h.pouch.getDoc(previousDocId, db)
                        .then((previousDoc) => {
                            return h.pouch.editDocByIdAndPut(docId, db, [{
                                key: position,
                                value: previousDoc[position] + 1
                            }]);
                        })
                        .then(() => {
                            if (h.str.getLastWordFromStringUsingSpliter(doc.kind, '-') === 'row') {
                                events.publish('changedRowNumber', doc.positionV);
                            } else if (h.str.getLastWordFromStringUsingSpliter(doc.kind, '-') === 'element') {
                                events.publish('changedElementNumber', doc.positionV);
                            }
                            resolve(response);
                        });
                } else {
                    return h.pouch.editDocByIdAndPut(docId, db, [{
                        key: position,
                        value: 1
                    }])
                        .then(() => {
                            if (h.str.getLastWordFromStringUsingSpliter(doc.kind, '-') === 'row') {
                                events.publish('changedRowNumber', doc.positionV);
                            } else if (h.str.getLastWordFromStringUsingSpliter(doc.kind, '-') === 'element') {
                                events.publish('changedElementNumber', doc.positionV);
                            }
                            resolve(response);
                        });
                }
            });
    });
}

function updatePosition(response, db) {
    return new Promise((resolve, reject) => {
        let counter = 1;

        function handleId(docId) {
            return h.pouch.getDoc(docId, db)
                .then((doc) => {
                    let nextDocId;
                    let position;

                    if (h.str.getLastWordFromStringUsingSpliter(doc.kind, '-') === 'row' || h.str.getLastWordFromStringUsingSpliter(doc.kind, '-') === 'section') {
                        nextDocId = doc.nextV;
                        position = 'positionV';
                    } else {
                        nextDocId = doc.nextH;
                        position = 'positionH';
                    }

                    return h.pouch.editDocByIdAndPut(docId, db, [{
                        key: position,
                        value: counter++
                    }])
                        .then(() => {
                            if (nextDocId !== 'last') {
                                handleId(nextDocId);
                            } else {
                                if (h.str.getLastWordFromStringUsingSpliter(doc.kind, '-') === 'row') {
                                    events.publish('changedRowNumber', doc.positionV);
                                } else if (h.str.getLastWordFromStringUsingSpliter(doc.kind, '-') === 'element') {
                                    events.publish('changedElementNumber', doc.positionV);
                                }
                                resolve(response);
                            }
                        });
                });
        }

        handleId(response.id);
    });
}

function updateDOMWithDocContent(level, row, kind, kindExceptLevelWithSpaceSeparators, db, order) {
    return new Promise((resolve, reject) => {
        if(level === 'section') {
            let docId = row.doc._id;
            let sectionName = h.str.removeLastWordFromStringUsingSplitter(kind, '-');
            views.parmaco.createSection(sectionName, db, order, docId, row.doc);
            resolve(row);
        } 
        else if (level === 'row') {
            let docId = row.doc._id;
            views.parmaco.createRow(kindExceptLevelWithSpaceSeparators, db, order, docId, row.doc);
            resolve(row);
        }
        else {
            let parentId = row.doc.parentId;
            views.parmaco.createElementOfKind(parentId + '-row-elements-box', kind, db, row, order);
            resolve(row);
        } 
    });
    
}


function updatePreviousKeyOfPreviouslyFirstDoc(firstRow, nextValue, response, previousKey, db) {
    if(!h.boolean.isEmpty(firstRow)) {
        return h.pouch.editDocByIdAndPut(nextValue, db, [{
            key: previousKey,
            value: response.id
        }]);
    } else {
        return response;
    }
}


function updateNextKeyOfPreviouslyLastDoc(lastRow, previousValue, response, nextKey, db) {
    if(!h.boolean.isEmpty(lastRow)) {
        return h.pouch.editDocByIdAndPut(previousValue, db, [{
            key: nextKey,
            value: response.id
        }]);
    } else {
        return response;
    }
}


function removeFromController(response, db, lastWordOfKind, direction) {
    if (lastWordOfKind === 'section') {

        if (direction === 'first') {
            controller.shift();
        } else {
            controller.pop();
        }
    } else if (lastWordOfKind === 'row') {

        let sectionKeys;

        sectionKeys = controller.map((section) => {
            return Object.keys(section)[0];
        });

        sectionKeys.forEach((sectionKey) => {
            controller.forEach((section) => {
                if (sectionKey === Object.keys(section)[0]) {
                    let rows = section[sectionKey];

                    let rowKeys;

                    rowKeys = rows.map((row) => {
                        return Object.keys(row)[0];
                    });

                    rowKeys.forEach((rowKey) => {
                        if (rowKey === response.id) {
                            rows.shift();
                        }
                    });
                }
            });
        });
    } else {

        let sectionKeys;

        sectionKeys = controller.map((section) => {
            return Object.keys(section)[0];
        });

        sectionKeys.forEach((sectionKey) => {
            controller.forEach((section) => {
                if (sectionKey === Object.keys(section)[0]) {
                    let rows = section[sectionKey];

                    let rowKeys;

                    rowKeys = rows.map((row) => {
                        return Object.keys(row)[0];
                    });

                    rowKeys.forEach((rowKey) => {
                        rows.forEach((row) => {
                            if (rowKey === Object.keys(row)[0]) {
                                let elements = row[rowKey];
                                elements.forEach((element) => {
                                    if (element === response.id) {
                                        elements.shift();
                                    }
                                });
                            }
                        });
                    });
                }
            });
        });
    }
}





//SYNC FUNCTIONS
function getConflictingObjs(conflictRows, db) {
    return new Promise(function (resolve, reject) {

        Promise.all(conflictRows.map(function (conflictRow) {
            return getRevisions(conflictRow.doc.country, conflictRow.doc.written, conflictRow.doc._rev, conflictRow.doc._conflicts, conflictRow.doc._id, db);
        })).then((results) => {
            resolve(results);
        });
    });

}


function getRevisions(winnerName, winnerWritten, winnerRev, conflictingRevs, docId, db) {
    return new Promise(function (resolve, reject) {
        Promise.all(conflictingRevs.map(function (conflictingRev) {
            return db.get(docId, {
                rev: conflictingRev
            }).then(function (doc) {
                return {
                    winner: {
                        name: winnerName,
                        written: winnerWritten,
                        rev: winnerRev
                    },
                    conflict: {
                        name: doc.country,
                        written: doc.written,
                        rev: doc._rev
                    },
                    docId: docId
                };
            });
        })).then((results) => resolve(results));
    });

}


function useExistingRev(latestDocRev) {
    return h.pouch.getPreviousRev(latestDocRev)
        .then((previousDocRev) => {
            latestDocRev.country = previousDocRev.country;
            return db.put(latestDocRev);
        })
        .then(() => {
            db.get(latestDocRev._id).then((latestDocRev) => console.log(latestDocRev));
        })
        .then(() => {
            fetchAllAndUpdate();
        });
}


function ChoosePulledOrExistingRev(latestDocRev) {
    fetchAllAndUpdate();

    // if (confirm("Do you want these? " + latestDocRev.country) == true) {
    //     h.pouch.fetchAllAndUpdate();
    // } else {
    //     useExistingRev(latestDocRev);
    // }
}



function displayConflicts(conflictingObjs) {
    let el = h.dom.getElement('id', 'conflicts');

    h.dom.appendInnerHTMLIO('', el);





    conflictingObjs.forEach(function (conflictingObj) {
        let newInput = h.dom.createElement('input');
        h.dom.setAttribute('type', 'radio', newInput);

        newInput.addEventListener('click', function () {
            Promise.all(conflictingObj.map(function (arrayEl) {
                return db.remove(conflictingObj[0].docId, arrayEl.conflict.rev);
            }))
                .then(function () {
                    h.dom.appendInnerHTMLIO('', el);
                });

        });
        h.dom.appendChildNodeIO(newInput, el);

        let newBold = h.dom.createElement('b');
        h.dom.appendInnerHTMLIO('Keep: ' + conflictingObjs[0][0].winner.name, newBold);
        h.dom.appendChildNodeIO(newBold, el);


        conflictingObj.forEach(function (item) {
            let newInput = h.dom.createElement('input');
            h.dom.setAttribute('type', 'radio', newInput);

            newInput.addEventListener('click', function () {
                Promise.all(conflictingObj.filter(function (element) {
                    return element.conflict.rev != item.conflict.rev;
                }).map(function (arrayEl) {
                    return db.remove(conflictingObj[0].docId, arrayEl.conflict.rev);
                }))
                    .then(function () {
                        return db.remove(conflictingObj[0].docId, conflictingObj[0].winner.rev);
                    })
                    .then(function () {
                        h.dom.appendInnerHTMLIO('', el);
                    });
            });

            h.dom.appendChildNodeIO(newInput, el);

            let newBold = h.dom.createElement('b');
            h.dom.appendInnerHTMLIO('Keep: ' + item.conflict.name, newBold);
            h.dom.appendChildNodeIO(newBold, el);

        });
    });

}



function chooseWinner(conflictObj) {
    return new Promise(function (resolve, reject) {

        if (!h.boolean.isEmpty(conflictObj)) {
            var el = h.dom.getElement('id', 'conflicts');
            el.innerHTML = '';

            let wrapperDiv = h.dom.createElement('div');
            let lableDiv = h.dom.createElement('div');
            let newButton = h.dom.createElement('button');


            h.dom.setAttribute('data-rev', conflictObj.winner.rev, newButton);
            h.dom.setAttribute('data-id', conflictObj.winner.id, newButton);

            newButton.addEventListener('click', function (event) {
                el.innerHTML = '';
                db.remove(event.target.getAttribute('data-id'), event.target.getAttribute('data-rev')).then(function () {
                    h.pouch.fetchAll(db).then((countries) => displayList(countries, 'countries', db));
                });
            });

            h.dom.appendInnerHTMLIO('Remove: ' + conflictObj.winner.name, newButton);

            h.dom.appendInnerHTMLIO('WINNER', lableDiv);

            h.dom.appendChildNodeIO(lableDiv, wrapperDiv);
            h.dom.appendChildNodeIO(newButton, wrapperDiv);
            h.dom.appendChildNodeIO(wrapperDiv, el);
            wrapperDiv = h.dom.createElement('div');
            lableDiv = h.dom.createElement('div');
            h.dom.appendInnerHTMLIO('LOOSERS', lableDiv);
            h.dom.appendChildNodeIO(lableDiv, wrapperDiv);


            Promise.all(conflictObj.loosers.map(function (item) {
                return new Promise(function (resolve, reject) {
                    let newButton = h.dom.createElement('button');

                    h.dom.setAttribute('data-rev', item.rev, newButton);

                    h.dom.setAttribute('data-id', conflictObj.winner.id, newButton);

                    newButton.addEventListener('click', function (event) {
                        el.innerHTML = '';
                        db.remove(event.target.getAttribute('data-id'), event.target.getAttribute('data-rev')).then(function () {
                            h.pouch.fetchAll(db).then((countries) => displayList(countries, 'countries', db));
                        });
                    });

                    h.dom.appendInnerHTMLIO('Remove: ' + item.name, newButton);

                    h.dom.appendChildNodeIO(newButton, wrapperDiv);

                    resolve();

                });

            })).then(function () {
                h.dom.appendChildNodeIO(wrapperDiv, el);
                console.log('object NOT empty');
                resolve();
            });
        }

        if (h.boolean.isEmpty(conflictObj)) {
            console.log('object empty');
            resolve();
        }
    });
}



function conflictSolver(doc) {
    return new Promise(function (resolve, reject) {

        let conflictObj = {};
        if (doc._conflicts) {

            conflictObj.id = doc._id;
            conflictObj.winner = {
                dbName: doc.dbName,
                id: doc._id,
                name: doc.country,
                rev: doc._rev
            };
            conflictObj.loosers = [];

            Promise.all(doc['_conflicts'].map(function (element) {
                return new Promise(function (resolve, reject) {
                    db.get(doc._id, {
                        rev: element
                    }).then(function (docItem) {
                        let tempObj = {};
                        tempObj.dbName = docItem.dbName;
                        tempObj.id = docItem._id;
                        tempObj.name = docItem.country;
                        tempObj.rev = docItem._rev;

                        resolve(tempObj);

                    }).catch(function (err) {
                        console.log('in the catch');
                    });

                });
            })).then(function (loosersAr) {
                conflictObj.loosers = loosersAr;
                resolve(conflictObj);
            });

        } else {
            resolve(conflictObj);
        }
    });
}


/**
 * Checks if DOM has elements that is not reprecented in db and removes it
 * @param {*} filteredRows an array of filtered rows from db
 * @param {*} elementIdKind kind of element (Rent)
 */
function removeElementFromDom(filteredRows, elementIdKind, parentId) {

    let sectionName = h.str.removeLastWordsFromStringUsingSplitter(elementIdKind, 2, '-');

    let elements = h.dom.getAllElementsByAttribute('[kind]');

    let cellElements;
    let rowElements;
    let sectionElements;
    let sectionRowElements;
    let rowCellElements;

    let notAddeds = [];

    sectionElements = elements.filter((element) => {
        return element.attributes['kind'].value === 'section-box';
    });

    rowElements = elements.filter((element) => {
        return element.attributes['kind'].value === 'row-box';
    });

    cellElements = elements.filter((element) => {
        return element.attributes['kind'].value === 'element-box';
    });

    rowCellElements = cellElements.filter((cellElement) => {
        return h.str.removeLastWordsFromStringUsingSplitter(cellElement.attributes['parentid'].value, 2, '-') === parentId;
    });

    rowCellElements;

    if (!h.boolean.isEmpty(filteredRows)) {

        notAddeds = rowCellElements.filter((rowCellElement) => {
            let matching = [];
            matching = filteredRows.filter((filteredRow) => {
                let rowCellElementId = rowCellElement.attributes['id'].value;

                let reducedRowCellElementId = h.str.removeLastWordsFromStringUsingSplitter(rowCellElementId, 2, '-');

                return filteredRow.id === reducedRowCellElementId;
            });
            if (!h.boolean.isEmpty(matching)) {
                return false;
            } else {
                return true;
            }
        });
    } else {
        notAddeds = rowCellElements;
    }

    notAddeds.forEach((notAdded) => {
        notAdded.parentElement.removeChild(notAdded);
    });
}

/**
 * Checks if DOM has elements that is not reprecented in db and removes it
 * @param {*} filteredRows an array of filtered rows from db
 * @param {*} elementIdKind kind of element (Rent)
 */
function removeRowFromDom(filteredRows, elementIdKind, parentId) {

    let sectionName = h.str.removeLastWordsFromStringUsingSplitter(elementIdKind, 1, '-');

    let elements = h.dom.getAllElementsByAttribute('[kind]');

    let rowElements;
    let sectionElements;
    let sectionRowElements;

    let notAddeds = [];

    sectionElements = elements.filter((element) => {
        return element.attributes['kind'].value === 'section-box';
    });

    rowElements = elements.filter((element) => {
        return element.attributes['kind'].value === 'row-box';
    });

    sectionRowElements = rowElements.filter((rowElement) => {
        return h.str.removeLastWordsFromStringUsingSplitter(rowElement.attributes['parentid'].value, 2, '-') === parentId;
    });


    if (!h.boolean.isEmpty(filteredRows)) {
        notAddeds = sectionRowElements.filter((sectionRowElement) => {
            let matching = [];
            matching = filteredRows.filter((filteredRow) => {
                let sectionRowElementId = sectionRowElement.attributes['id'].value;

                let reducedSectionRowElementId = h.str.removeLastWordsFromStringUsingSplitter(sectionRowElementId, 2, '-');
                return filteredRow.id === reducedSectionRowElementId;
            });

            if (!h.boolean.isEmpty(matching)) {
                return false;
            } else {
                return true;
            }
        });
    } else {
        notAddeds = sectionRowElements;
    }

    notAddeds.forEach((notAdded) => {
        notAdded.parentElement.removeChild(notAdded);
    });
}


/**
 * Checks if DOM has elements that is not reprecented in db and removes it
 * @param {*} filteredRows an array of filtered rows from db
 * @param {*} elementIdKind kind of element (Rent)
 */
function removeSectionFromDom(filteredRows, elementIdKind) {
    let elements = h.dom.getAllElementsByAttribute('[kind]');

    elements = elements.filter((element) => {
        return element.attributes['kind'].value === 'section-box';
    });


    //Compares DOM elements with db in a nested filter
    let notAddeds = elements.filter((element) => {
        let matching = [];
        matching = filteredRows.filter((filteredRow) => {
            let elementId = element.attributes['id'].value;
            let reducedElementId = h.str.removeLastWordsFromStringUsingSplitter(elementId, 2, '-');
            return filteredRow.id === reducedElementId;
        });
        if (!h.boolean.isEmpty(matching)) {
            return false;
        } else {
            return true;
        }
    });
    notAddeds.forEach((notAdded) => {
        h.dom.getElement('id', 'main').removeChild(notAdded);
    });
}


/**
 * Checks if DOM has elements that is not reprecented in db and removes it
 * @param {*} filteredRows an array of filtered rows from db
 * @param {*} elementIdKind kind of element (Rent)
 */
function removeFromDom(filteredRows, elementIdKind) {
    let elements = h.dom.getAllElementsByAttribute('[container]');

    elements = elements.filter((element) => {
        return element.attributes['container'].value === elementIdKind;
    });



    //Compares DOM elements with db in a nested filter
    let notAddeds = elements.filter((element) => {
        let matching = [];
        matching = filteredRows.filter((filteredRow) => {
            return filteredRow.id === element.attributes['contained-dbid'].value;
        });
        if (!h.boolean.isEmpty(matching)) {
            return false;
        } else {
            return true;
        }
    });
    notAddeds.forEach((notAdded) => {
        h.dom.getElement('id', elementIdKind + '-elements-box').removeChild(notAdded);
    });
}



function getNextRowInChain(filteredRows, id, sortedRows) {
    let nextRow = [];

    nextRow = filteredRows.filter((filteredRow) => {
        return filteredRow.doc._id === id;
    });

    sortedRows.push(nextRow[0]);

    if (nextRow[0].doc.nextH !== 'last') {
        return getNextRowInChain(filteredRows, nextRow[0].doc.nextH, sortedRows);
    } else {
        return sortedRows;
    }
}


function getChainedRowsOfKind(db, kind) {
    return h.pouch.getAllRowsWithFilter(db, 'rent')
        .then((filteredRows) => {
            let sortedRows = [];
            let firstRow = [];
            firstRow = filteredRows.filter((filteredRow) => {
                return filteredRow.doc.previousH === 'first';
            });

            sortedRows.push(firstRow[0]);

            if (firstRow[0].doc.nextH !== 'last') {
                return getNextRowInChain(filteredRows, firstRow[0].doc.nextH, sortedRows);

            } else {
                return sortedRows;
            }
        });
}



//test function
function nonsensFunction() {

    let elementValue = 0;
    return elementValue;
}

function getSectionIds(controller) {
    let sectionIds = controller.map((section) => {
        return Object.keys(section)[0];
    });
    return sectionIds;
}
function getRowIds(controller) {
    let sectionIds = getSectionIds(controller);
    let rowIds = sectionIds.map((sectionId) => {
        return getRowIdsFromSectionId(controller, sectionId);
    });
    return h.arr.flatten(rowIds);

}

function getCellIds(controller) {
    let rowIds = getRowIds(controller);
    let cellIds = rowIds.map((rowId) => {
        return getCellIdsFromRowId(controller, rowId); 
    });
    return cellIds;
}



function getSummaryRowIdFromSectionId(controller, sectionId) {
    let sectionKeys;
    sectionKeys = controller.map((section) => {
        return Object.keys(section)[0];
    });

    let sectionIdIndex = sectionKeys.indexOf(sectionId);
    let section = controller[sectionIdIndex][sectionId];
    let rowKeys;
    rowKeys = section.map((row) => {
        return Object.keys(row)[0];
    });

    let summaryRowKey = rowKeys.pop();

    return summaryRowKey;
}


function getRowIdsFromSectionId(controller, sectionId) {
    let sectionKeys;
    sectionKeys = controller.map((section) => {
        return Object.keys(section)[0];
    });

    let sectionIdIndex = sectionKeys.indexOf(sectionId);
    let section = controller[sectionIdIndex][sectionId];
    let rowKeys;
    rowKeys = section.map((row) => {
        return Object.keys(row)[0];
    });

    rowKeys.pop();

    return rowKeys;
}

function getSummaryCellIdsFromRowId(controller, rowId) {
    let sectionKeys;
    sectionKeys = controller.map((section) => {
        return Object.keys(section)[0];
    });

    let rows = sectionKeys.map((sectionKey, index) => {
        return controller[index][sectionKey];
    });

    rows = h.arr.flatten(rows);

    console.log('THEROWS!!!');
    console.log(rows);

    let rowKeys;

    rowKeys = rows.map((row) => {
        return Object.keys(row)[0];
    });

    let rowIdIndex = rowKeys.indexOf(rowId);
    let cellIds = rows[rowIdIndex][rowId];

    console.log('ZZZZZ')
    console.log(cellIds);

    let summarycellIds = cellIds.slice(0, 1);

    return summarycellIds;
}

function getCellIdsFromRowId(controller, rowId) {
    let sectionKeys;
    sectionKeys = controller.map((section) => {
        return Object.keys(section)[0];
    });

    let rows = sectionKeys.map((sectionKey, index) => {
        return controller[index][sectionKey];
    });

    rows = h.arr.flatten(rows);

    let rowKeys;

    rowKeys = rows.map((row) => {
        return Object.keys(row)[0];
    });

    let rowIdIndex = rowKeys.indexOf(rowId);
    let cellIds = rows[rowIdIndex][rowId];

    console.log('lookHERE');
    console.log(cellIds);
    console.log(cellIds.slice(1));

    

    return cellIds.slice(1);
}

function getCellIdsFromSummaryRowId(controller, rowId) {
    let sectionKeys;
    sectionKeys = controller.map((section) => {
        return Object.keys(section)[0];
    });

    let rows = sectionKeys.map((sectionKey, index) => {
        return controller[index][sectionKey];
    });

    rows = h.arr.flatten(rows);

    let rowKeys;

    rowKeys = rows.map((row) => {
        return Object.keys(row)[0];
    });

    let rowIdIndex = rowKeys.indexOf(rowId);
    let cellIds = rows[rowIdIndex][rowId];

    console.log('lookHERE summary cells');
    console.log(cellIds);
    //console.log(cellIds.slice(0, -1));

    

    return cellIds;
}

function getRowIdFromDoc(doc) {
    return doc.parentId;
}

function getSectionRowIdsFromRowId(docRowId, controller) {
    let sectionIds = getSectionIds(controller);
    let rowIdsArray = sectionIds.map((sectionId) => {
        return getRowIdsFromSectionId(controller, sectionId);
    });

    let sectionRowIds = rowIdsArray.filter((rowIds) => {
        let match = [];
        match = rowIds.filter((rowId) => {
            return rowId === docRowId;
        });

        if (h.boolean.isEmpty(match)) {
            return false;
        } else {
            return true;
        }
    });

    return sectionRowIds[0];
}

function getAllDocsInColumn(doc, db, controller) {

    let column = doc.positionH;
    console.log('column');
    console.log(column);
    let docRowId = getRowIdFromDoc(doc);
    console.log('docRowId');
    console.log(docRowId);
    let sectionRowIds = getSectionRowIdsFromRowId(docRowId, controller);
    console.log('sectionRowIds');
    console.log(sectionRowIds);
    let sectionCellIdsArray = sectionRowIds.map((sectionRowId) => {
        return getCellIdsFromRowId(controller, sectionRowId);
    });
    console.log('sectionCellIdsArray');
    console.log(sectionCellIdsArray);

    let sectionCellIdsArrayOfLength = sectionCellIdsArray.filter((sectionCellIds) => {
        return sectionCellIds.length >= column -1;
    });
    console.log('sectionCellIdsArrayOfLength');
    console.log(sectionCellIdsArrayOfLength);

    let cellIdsInColumn = sectionCellIdsArrayOfLength.map((sectionCellIds) => {
        return sectionCellIds[column - 2];
    });

    console.log('cellIdsInColumn');
    console.log(cellIdsInColumn);


    let cellsInColumn = cellIdsInColumn.map((cellIdInColumn) => {
        return h.pouch.getDoc(cellIdInColumn, db);
    });

    return Promise.all(cellsInColumn);
}

function getAllDocsInRow(doc, db, controller) {

    let column = doc.positionH;
    console.log('column');
    console.log(column);
    let docRowId = getRowIdFromDoc(doc);
    console.log('docRowId');
    console.log(docRowId);
    let cellIdsInRow = getCellIdsFromRowId(controller, docRowId);

    console.log('cellIdsInRow');
    console.log(cellIdsInRow);

    let cellsInRow = cellIdsInRow.map((cellIdInRow) => {
        return h.pouch.getDoc(cellIdInRow, db);
    });

    return Promise.all(cellsInRow);

    // let sectionCellIdsArrayOfLength = sectionCellIdsArray.filter((sectionCellIds) => {
    //     return sectionCellIds.length >= column -1;
    // });
    // console.log('sectionCellIdsArrayOfLength');
    // console.log(sectionCellIdsArrayOfLength);

    // let cellIdsInColumn = sectionCellIdsArrayOfLength.map((sectionCellIds) => {
    //     return sectionCellIds[column - 2];
    // });

    // console.log('cellIdsInColumn');
    // console.log(cellIdsInColumn);


    // let cellsInColumn = cellIdsInColumn.map((cellIdInColumn) => {
    //     return h.pouch.getDoc(cellIdInColumn, db);
    // });

}

function getAllDocsByRowId(rowId, db, controller) {

    let cellIdsInRow = getCellIdsFromRowId(controller, rowId);

    console.log('cellIdsInRow');
    console.log(cellIdsInRow);

    let cellsInRow = cellIdsInRow.map((cellIdInRow) => {
        return h.pouch.getDoc(cellIdInRow, db);
    });

    return Promise.all(cellsInRow);

    // let sectionCellIdsArrayOfLength = sectionCellIdsArray.filter((sectionCellIds) => {
    //     return sectionCellIds.length >= column -1;
    // });
    // console.log('sectionCellIdsArrayOfLength');
    // console.log(sectionCellIdsArrayOfLength);

    // let cellIdsInColumn = sectionCellIdsArrayOfLength.map((sectionCellIds) => {
    //     return sectionCellIds[column - 2];
    // });

    // console.log('cellIdsInColumn');
    // console.log(cellIdsInColumn);


    // let cellsInColumn = cellIdsInColumn.map((cellIdInColumn) => {
    //     return h.pouch.getDoc(cellIdInColumn, db);
    // });

}

async function addSectionsToController(rowsPointingAtFirst, rows, controller, direction, db) {
    console.log('THE SECTIONS');
    console.log(rows);
    let i = 0;
    let max = rowsPointingAtFirst.length;
    let doc = rowsPointingAtFirst[i].doc;
    let weContinue = true;

    while (weContinue) {
        await addSectionToController(doc, db, direction, controller)

        if (doc.nextV !== 'last') {
            doc = await h.pouch.getDoc(doc.nextV, db);
        } else {
            ++i;
            if (i < max) {
                console.log(i);
                console.log(i);
                console.log('rowsPointingAtFirst');
                console.log(rowsPointingAtFirst);
                doc = rowsPointingAtFirst[i].doc;
            } else {
                weContinue = false;
            }
        }        
    } 
}

async function addRowsToController(rowsPointingAtFirst, rows, controller, direction, db) {
    console.log('THE ROWS');
    console.log(rows);
    console.log('THE Controller');
    console.log(controller);
    let i = 0;
    let max = rowsPointingAtFirst.length;
    let doc = rowsPointingAtFirst[i].doc;
    let weContinue = true;

    while (weContinue) {
        await addRowToController(doc, db, direction, controller)

        if (doc.nextV !== 'last') {
            doc = await h.pouch.getDoc(doc.nextV, db);
        } else {
            ++i;
            if (i < max) {
                console.log(i);
                console.log(i);
                console.log('rowsPointingAtFirst');
                console.log(rowsPointingAtFirst);
                doc = rowsPointingAtFirst[i].doc;
            } else {
                weContinue = false;
            }
        }        
    }
}


async function addCellsToController(rowsPointingAtFirst, rows, controller, direction, db) {
    console.log('THE CELLS');
    console.log(rows);
    console.log('THE CELLS POINTING AT FIRST');
    console.log(rowsPointingAtFirst);
    let i = 0;
    let max = rowsPointingAtFirst.length;
    let doc = rowsPointingAtFirst[i].doc;
    let weContinue = true;

    console.log('max');
    console.log(max);


    while (weContinue) {
        await addCellToController(doc, db, direction, controller)
        console.log('theDOCTOadd');
        console.log(doc);

        if (doc.nextH !== 'last') {
            doc = await h.pouch.getDoc(doc.nextH, db);
        } else {
            ++i;
            if (i < max) {
                console.log(i);
                console.log(i);
                console.log('rowsPointingAtFirst');
                console.log(rowsPointingAtFirst);
                doc = rowsPointingAtFirst[i].doc;
            } else {
                weContinue = false;
            }
            
        }        
    } 
}


function addSectionToController(doc, db, direction, controller) {
    return new Promise(function (resolve, reject) {
        console.log('THE CONTROLLER');
        console.log(controller);
    
        let docId = doc._id;
        let section = {};
        section[docId] = [];

        if (direction === 'first') {
            controller.unshift(section);
            console.log('ADDED SECTION TO CONTROLLER FIRST');
            console.log(controller);
            resolve(controller);
        } else {
            controller.push(section);
            console.log('ADDED SECTION TO CONTROLLER LAST');
            console.log(controller);
            resolve(controller);
        }
    });   
}


function addRowToController(doc, db, direction, controller) {
    return new Promise(function (resolve, reject) {
        let docId;
        let sectionId;
        let row;
        let sectionKeys;
        let sectionIdIndex;

        row = {};
        docId = doc._id;
        row[docId] = [];
        sectionId = doc.parentId;

        console.log('!!!controller');
        console.log(controller);

        sectionKeys = controller.map((section) => {
            return Object.keys(section)[0];
        });

        sectionIdIndex = sectionKeys.indexOf(sectionId);

        if (direction === 'first') {
            controller[sectionIdIndex][sectionId].unshift(row);
            console.log('ADDED ROW TO CONTROLLER FIRST');
            console.log(controller);
            resolve(controller);
        } else {
            controller[sectionIdIndex][sectionId].push(row);
            console.log('ADDED ROW TO CONTROLLER LAST');
            console.log(controller);
            resolve(controller);
        }
    });    
}


function addCellToController(doc, db, direction, controller) {
    return new Promise(function (resolve, reject) {

        console.log('doc');
        console.log(doc);
        let docId;
        let cell;
        let sectionKey;
        let sectionKeys;
        let sectionRows;
        let sectionRowKey;
        let section;
        let rowKey;
        let rowKeys;
        let sectionId;
        let rowId;
        let sectionIdIndex;
        let rowIdIndex;
        
        docId = doc._id;
        rowId = doc.parentId;
        cell = {};
        cell[docId] = [];


        console.log('rowId');
        console.log(rowId);

        controller.forEach((section) => {
            sectionKey = Object.keys(section)[0];
            sectionRows = section[sectionKey];

            sectionRows.forEach((sectionRow) => {
                sectionRowKey = Object.keys(sectionRow)[0];

                console.log('sectionRow');
                console.log(sectionRow);
                console.log('sectionRowKey');
                console.log(sectionRowKey);
                if (sectionRowKey === rowId) {
                    sectionId = sectionKey;
                }
            });
        });

        
        sectionKeys = controller.map((section) => {
            return Object.keys(section)[0];
        });

        console.log('sectionKeys');
        console.log(sectionKeys);

        console.log('sectionId');
        console.log(sectionId);

        sectionIdIndex = sectionKeys.indexOf(sectionId);

        console.log('sectionIdIndex');
        console.log(sectionIdIndex);

        section = controller[sectionIdIndex][sectionId];

        console.log('section');
        console.log(section);
        
        rowKeys = section.map((row) => {
            return Object.keys(row)[0];
        });

        console.log('rowKeys');
        console.log(rowKeys);

        rowIdIndex = rowKeys.indexOf(rowId);

        console.log('rowIdIndex');
        console.log(rowIdIndex);


        console.log('controller Before');
        console.log(controller);

        if (direction === 'first') {
            console.log('HERE!!!!!!!!!');
            section[rowIdIndex][rowId].unshift(docId);
            console.log('ADDED CELL TO CONTROLLER FIRST');
            console.log(controller);
        } else {
            console.log('THERE!!!!!!!!!');
            controller[sectionIdIndex][sectionId][rowIdIndex][rowId].push(docId);
            controller = JSON.parse(JSON.stringify(controller));
            console.log('ADDED CELL TO CONTROLLER LAST');
            console.log(controller);
            console.log(controller);


        }

        // console.log('controller After');
        // console.log(controller);



        // let numberOfColumns = section[rowIdIndex][rowId].length;
        // events.publish('columnAddedToRow', numberOfColumns);

        resolve(controller);
    });     
}

function addToController(row, db, lastWordOfKind, direction, controller) {
    console.log('THE CONTROLLER');
    console.log(controller);
    let doc = row.doc;
    let docId = doc._id;
    let tempObj = {};
    let sectionId = doc.parentId;
    let sectionKeys;
    let sectionKey;
    let sectionIdIndex;
    let rowId = doc.parentId;

    let rowKeys;
    let rowKey;
    let rowIdIndex;
    let section;
    let sectionRows;
    console.log('ADD TO CONTROLLER!');
    console.log(controller);
    console.log(docId);

    return new Promise(function (resolve, reject) {
        if (lastWordOfKind === 'section') {

            tempObj[docId] = [];
    
            if (direction === 'first') {
                controller.unshift(tempObj);
                console.log('ADDED SECTION TO CONTROLLER FIRST');
                console.log(controller);
                resolve(row);
            } else {
                controller.push(tempObj);
                console.log('ADDED SECTION TO CONTROLLER LAST');
                console.log(controller);
                resolve(row);
            }

            
        } else if (lastWordOfKind === 'row') {
            console.log('THE DOC');
            console.log(doc);

            tempObj[docId] = [];

            

            sectionKeys = controller.map((section) => {
                return Object.keys(section)[0];
            });

            sectionIdIndex = sectionKeys.indexOf(sectionId);

            if (direction === 'first') {
                controller[sectionIdIndex][sectionId].unshift(tempObj);
                console.log('ADDED ROW TO CONTROLLER FIRST');
                console.log(controller);
                resolve(row);
            } else {
                controller[sectionIdIndex][sectionId].push(tempObj);
                console.log('ADDED ROW TO CONTROLLER LAST');
                console.log(controller);
                resolve(row);
            }
        } else {
            console.log('DOC to add to controller');
            console.log(doc);


            tempObj[docId] = [];

            if (!h.boolean.isEmpty(controller)) {
                controller.forEach((section) => {
                    sectionKey = Object.keys(section)[0];
                    sectionRows = section[sectionKey];

                    if (!h.boolean.isEmpty(sectionRows)) {
                        sectionRows.forEach((row) => {
                            rowKey = Object.keys(row)[0];
                            if (rowKey === rowId) {
                                sectionId = sectionKey;
                            }
                        });
                    }
                });
            }

            
            sectionKeys = controller.map((section) => {
                return Object.keys(section)[0];
            });

            console.log('sectionKeys');
            console.log(sectionKeys);

            sectionIdIndex = sectionKeys.indexOf(sectionId);

            console.log('sectionIdIndex');
            console.log(sectionIdIndex);

            section = controller[sectionIdIndex][sectionId];

            console.log('section');
            console.log(section);
            
            rowKeys = section.map((row) => {
                return Object.keys(row)[0];
            });

            console.log('rowKeys');
            console.log(rowKeys);

            rowIdIndex = rowKeys.indexOf(rowId);

            console.log('rowIdIndex');
            console.log(rowIdIndex);


            console.log('controller Before');
            console.log(controller);

            if (direction === 'first') {
                console.log('HERE!!!!!!!!!');
                section[rowIdIndex][rowId].unshift(docId);
                console.log('ADDED CELL TO CONTROLLER FIRST');
                console.log(controller);
            } else {
                console.log('THERE!!!!!!!!!');
                controller[sectionIdIndex][sectionId][rowIdIndex][rowId].push(docId);
                controller = JSON.parse(JSON.stringify(controller));
                console.log('ADDED CELL TO CONTROLLER LAST');
                console.log(controller);
                console.log(controller);


            }

            console.log('controller After');
            console.log(controller);



            let numberOfColumns = section[rowIdIndex][rowId].length;
            events.publish('columnAddedToRow', numberOfColumns);

            resolve(row);
        }

    }); 
    
}





var lastRowsInSections = [];
var maxRowLength;
var minRowLength;



//Model

/**
*  Model holds data with access and modify methods.  
*  register() adds items to subject.  When model state 
*  changes calls subject.notifyObservers() to redraw list.
*/
function ToDoModel() {
	const eventTarget = document.createElement('event-target');
	const list = [];
    return {
        getList: function() {
            return list;
        },
        add: function (text) {
            console.log('adding');
            list.push(text);
			eventTarget.dispatchEvent(new Event('notify'));
        },
        
        // observer
        register: function(...args) {
            args.forEach(elem => {
                console.log(elem);
				eventTarget.addEventListener('notify', elem.notify);
            });
        }
    };
}


//View

/**
*  View handle output to template.  On init gets DOM refs,
*  and expose to controller.  When model calls notify(), 
*  View queries model for data and data performs pres. logic.
*/
function ToDoView(model, inputElement, outputElement) {
    const DOM = {
        button: inputElement,
        list: outputElement
    }

    function getData() {
         return model.getList();
    }

    return {
        getDOM: function() {
            return DOM;
        },
        notify: function() {
            const html = getData();
            console.log(html);
            let newTextEl = h.dom.createElement('div');
            h.dom.appendInnerHTMLIO(html, newTextEl);
            h.dom.appendChildNodeIO(newTextEl, DOM.list)
         }
    };          
}



//Controller

/**
*  Controllers handle input.  Gets DOM refs from View.
*  then sets event handlers for input text box to add new 
*  item.  Performs register() of both View and itself
*  to set up list checkbox and remove click event handlers
*  after DOM rebuilt.
*/
function ToDoCtrl(view, model) {
    const DOM = view.getDOM();
    // input handler
    DOM.button.addEventListener('click', () => {
        model.add('hej');
    });

    model.register(view, this);

    return {
        notify: function() {
            console.log('hej');
        }
    };
}










//Model

/**
*  Model holds data with access and modify methods.  
*  register() adds items to subject.  When model state 
*  changes calls subject.notifyObservers() to redraw list.
*/
function ButtonModel() {
	const eventTarget = document.createElement('event-target');
	const list = [];
    return {
        getList: function() {
            return list;
        },
        add: function (text) {
            console.log('adding');
            let buttonElement = h.dom.createElement('button');
            let divElement = h.dom.createElement('div');
            h.dom.appendInnerHTMLIO(text, buttonElement);
            let elementsObj = {};
            elementsObj.inputElement = buttonElement;
            elementsObj.outputElement = divElement;
            list.push(elementsObj);

			eventTarget.dispatchEvent(new Event('notify'));
        },
        
        // observer
        register: function(...args) {
            args.forEach(elem => {
                console.log(elem);
				eventTarget.addEventListener('notify', elem.notify);
            });
        }
    };
}

//View

/**
*  View handle output to template.  On init gets DOM refs,
*  and expose to controller.  When model calls notify(), 
*  View queries model for data and data performs pres. logic.
*/

function ButtonView(model) {
    const DOM = {
        button: h.dom.getElement('id', 'buttonsButton'),
        list: h.dom.getElement('id', 'buttonList')
    }

    function getData() {
         return model.getList();
    }

    return {
        getDOM: function() {
            return DOM;
        },
        notify: function() {
            const elementsObjs = getData();
            console.log(elementsObjs);
            let elementsObj = elementsObjs.slice(-1)[0];

            h.dom.appendChildNodeIO(elementsObj.inputElement, elementsObj.outputElement);
            const model = new ToDoModel(),
                view = new ToDoView(model, elementsObj.inputElement, elementsObj.outputElement),
                ctrl = new ToDoCtrl(view, model);
            h.dom.appendChildNodeIO(elementsObj.outputElement, DOM.list); 
         }
    };          
}


//Controller

/**
*  Controllers handle input.  Gets DOM refs from View.
*  then sets event handlers for input text box to add new 
*  item.  Performs register() of both View and itself
*  to set up list checkbox and remove click event handlers
*  after DOM rebuilt.
*/
function ButtonCtrl(view, model) {
    const DOM = view.getDOM();
    // input handler
    DOM.button.addEventListener('click', () => {
        model.add('button');
    });

    model.register(view, this);

    return {
        notify: function() {
            console.log('button');
        }
    };
}

const buttonModel = new ButtonModel(),
      buttonView = new ButtonView(buttonModel),
      buttonCtrl = new ButtonCtrl(buttonView, buttonModel);



function getValuesArrayFromSection(controller, id, db) {
    let sectionIds = getSectionIds(controller);

    let rowIdsFromSectionId = getRowIdsFromSectionId(controller, id);

    let cellIdsFromRowIdArray = rowIdsFromSectionId.map(rowIdFromSectionId => {
        return getCellIdsFromRowId(controller, rowIdFromSectionId);
    });

    return Promise.all(rowIdsFromSectionId.map(rowIdFromSectionId => {
        return getAllDocsByRowId(rowIdFromSectionId, db, controller);
    }))
        .then(resultsArray => {
            console.log('cellsFromRowIdArray');
            console.log(resultsArray);
            let valuesArray = resultsArray.map(results => {
                return results.map(result => {
                    return Number(result.elementValue);
                });
            });

            return valuesArray;
        });
}


function makeCounter() {
    let value = 0;
    return function() {
        return value++;
    }
}

var nextSerialNumber = makeCounter();


//Model
function ChartModel(doc, db, controller) {
	const eventTarget = document.createElement('event-target');
    let data = {
        labels: ['2018', '2019', '2020', '2021', '2022'],
        series: [
            [12, 9, 7, 8, 5],
            [2, 1, 3.5, 7, 3],
            [1, 3, 4, 5, 6]
        ]
    };
    const id = doc._id;

    return {
        getData: function() {
            return data;
        },
        getDB: function() {
            return db;
        },
        newData: function () {
            getValuesArrayFromSection(controller, id, db)
                .then(valuesArray => {
                    data = {
                        labels: ['2018', '2019', '2020', '2021', '2022'],
                        series: valuesArray
                    };
                    eventTarget.dispatchEvent(new Event('notify'));
                });
	
        },
        register: function(...args) {
            args.forEach(elem => {
				eventTarget.addEventListener('notify', elem.notify);
            });
        }
    };
}



//View
function ChartView(model) {
    let elementDiv;

    function getData() {
            return model.getData();
    }

    function getDB() {
        return model.getDB();
    }

    let elementInfo = new h.dom.ElementInfoConstructor();

    elementInfo.kind = 'div';
    elementInfo.attribute.push({
        key: 'class',
        value: 'ct-chart'
    });

    let chartId = 'chart-' + nextSerialNumber();

    elementInfo.attribute.push({
        key: 'id',
        value: chartId
    });

    elementDiv = h.dom.elementBuilder(elementInfo, getDB());

    let DOM = {
        chartElement: elementDiv
    }

    var options = {
        width: 600,
        height: 200
    };


    return {
        getDOM: function() {
            return DOM;
        },
        notify: function() {
            console.log('HERE!');
            console.log(DOM.chartElement);
            //console.log(document.querySelector('div[is="section-parmaco"]'));
            new Chartist.Line(DOM.chartElement, getData(), options);
            }
    };          
}



//Controller
function ChartCtrl(view, model) {
    events.subscribe('changedCellValue', function() {
        return model.newData();
    });

    model.register(view, this);

    return {
        notify: function() {
        }
    };
}

//Model
function CellModel(doc, db, editable) {
	const eventTarget = document.createElement('event-target');

    const id = doc._id;

    return {
        getData: function() {
            return h.pouch.getDoc(id, db)
            .then((doc) => {
                return Number(doc.elementValue);
            });
        },
        getEditable: function() {
            return editable;
        },
        getDoc: function(){
            return doc;
        },
        getDB: function() {
            return db;
        },
        newData: function(event) {
            let element = event.target;
                let elementValue = element.value;
                let docId = h.dom.getAttribute('dbid', element);
                
                let parameters = [
                    {
                        key: 'elementValue',
                        value: elementValue
                    }
                ];
                h.pouch.editDocByIdAndPut(docId, db, parameters)
                    .then(() => {
                        return h.pouch.getDoc(docId, db);
                    })
                    .then((doc) => {
                        events.publish('changedCellValue', {
                            value: elementValue,
                            sectionName: h.str.removeLastWordsFromStringUsingSplitter(doc.kind, 2, '-'),
                            positionH: doc.positionH,
                            positionV: doc.positionV,
                            doc: doc
                        });
                        eventTarget.dispatchEvent(new Event('notify'));
                    });

                
                event.target.blur();
        },
        register: function(...args) {
            args.forEach(elem => {
				eventTarget.addEventListener('notify', elem.notify);
            });
        }
    };
}




//View
function CellView(model) {
    let elementDiv;

    function getData() {
         return model.getData();
    }

    function getDB() {
        return model.getDB();
    }

    function getDoc() {
        return model.getDoc();
    }
    function getEditable() {
        return model.getEditable();
    }

    let elementInfo = new h.dom.ElementInfoConstructor();
    elementInfo.kind = 'input';

    elementInfo.attribute.push({
        key: 'class',
        value: 'w-input'
    });

    elementInfo.attribute.push({
        key: 'type',
        value: 'text'
    });

    if (getEditable() !== 'editable') {
        elementInfo.attribute.push({
            key: 'readonly',
            value: 'readonly'
        });
    }


    let extraAttributes = [
        {
            key: 'kind-' + getDoc().kind,
            value: true
        },
        {
            key: 'kind',
            value: getDoc().kind
        },
        {
            key: 'placeholder',
            value: nonsensFunction()
        },
        {
            key: 'id',
            value: getDoc()._id
        },
        {
            key: 'dbid',
            value: getDoc()._id
        },
        {
            key: 'value',
            value: getDoc().elementValue
        },
        {
            key: 'data-cell',
            value: getDoc().elementId
        }
    ];

    let extraEvents = [
        {
            key: 'click',
            value: h.event.detectClickFunction
        },
        // {
        //     key: 'keypress',
        //     value: h.event.detectKeybordFunction
        // },
        {
            key: 'blur',
            value: h.event.detectBlurFunction
        }
    ];
    
    extraAttributes.forEach((item) => {
        elementInfo.attribute.push(item);
    });

    extraEvents.forEach((item) => {
        elementInfo.event.push(item);
    });


    elementDiv = h.dom.elementBuilder(elementInfo, getDB());

    let DOM = {
        cellElement: elementDiv
    }


    return {
        getDOM: function() {
            return DOM;
        },
        notify: function() {
            //let elementValue = getData();
            getData()
                .then((elementValue) => {
                    //alert(elementValue);
                    h.dom.setAttribute('value', elementValue, elementDiv);
                    elementDiv.value = elementValue;
                })
            
            
         }
    };          
}


//Controller
function CellCtrl(view, model) {
    function getDB() {
        return model.getDB();
    }

    let DOM = view.getDOM();
    DOM.cellElement.addEventListener('keypress', function(event) {
        let keyPressed = event.whitch || event.keyCode || event.charCode;
        if (keyPressed === 13) {
            event.preventDefault();
            return model.newData(event);
        }    
    });

    model.register(view, this);

    return {
        notify: function() {
        }
    };
}





//Model
function HeadlineModel(docId, db) {
	const eventTarget = document.createElement('event-target');
    let data = '';

    return {
        getData: function() {
            return data;
        },
        getDB: function() {
            return db;
        },
        newData: function () {
            h.pouch.getDoc(docId, db)
                .then((doc) => {
                    if (h.str.getLastWordFromStringUsingSpliter(doc.kind, '-') === 'section') {
                        data = doc.kind;
                    } else if (h.str.getLastWordFromStringUsingSpliter(doc.kind, '-') === 'row') {
                        data = doc.positionV;
                    }

                    eventTarget.dispatchEvent(new Event('notify'));
                    
                });
	
        },
        register: function(...args) {
            args.forEach(elem => {
				eventTarget.addEventListener('notify', elem.notify);
            });
        }
    };
}

//View
function HeadlineView(model) {
    let elementH1;

    function getData() {
         return model.getData();
    }

    function getDB() {
        return model.getDB();
    }

    let elementInfo = new h.dom.ElementInfoConstructor();

    elementInfo.kind = 'h1';
    elementInfo.attribute.push({
        key: 'class',
        value: 'main-heading'
    });

    elementH1 = h.dom.elementBuilder(elementInfo, getDB());

    h.dom.appendInnerHTMLIO(getData(), elementH1);

    let DOM = {
        element: elementH1
    }

    return {
        getDOM: function() {
            return DOM;
        },
        notify: function() {
            elementH1.innerHTML = getData();
         }
    };          
}

//Controller
function HeadlineCtrl(view, model) {

    events.subscribe('changedRowNumber', function(obj) {
        return model.newData();
    });

    model.register(view, this);

    return {
        notify: function() {
        }
    };
}



//Model
function ButtonAddOneDocOfKindFirstModel(db) {
	const eventTarget = document.createElement('event-target');
    let section;
    let ev;

    return {
        getSection: function() {
            return section;
        },
        getDB: function() {
            return db;
        },
        getEvent: function() {
            return ev;
        },
        newSection: function(event) {
            let element = h.dom.getElement('id', 'inputSectionName');
            let sectionName = h.dom.getAttribute('value', element);
            let kind = sectionName + '-section';
            let parentIdValue = event.target.attributes.parentId.value;
            return h.event.addOneDocFirstWithFilter(kind, parentIdValue, db)
                .then((row) => {
                    section = row;
                    eventTarget.dispatchEvent(new Event('notify'));
                });
        },
        register: function(...args) {
            args.forEach(elem => {
				eventTarget.addEventListener('notify', elem.notify);
            });
        }
    };
}

//View
function ButtonAddOneDocOfKindFirstView(model, kind, parentId) {
    let buttonElement;

    function getSection() {
         return model.getSection();
    }

    function getDB() {
        return model.getDB();
    }

    function getEvent() {
        return model.getEvent();
    }

    let elementInfo = new h.dom.ElementInfoConstructor();

    elementInfo.kind = 'button';

    elementInfo.attribute.push({
        key: 'kind',
        value: kind
    });

    elementInfo.attribute.push({
        key: 'parentId',
        value: parentId
    });

    buttonElement = h.dom.elementBuilder(elementInfo, getDB());

    h.dom.appendInnerHTMLIO('Add one ' + kind + 'first', buttonElement);
    
    let DOM = {
        element: buttonElement
    }

    return {
        getDOM: function() {
            return DOM;
        },
        notify: function() {
            let event = getEvent();
            let kind = event.target.attributes.kind.value;
            let parentIdValue = event.target.attributes.parentId.value;

            let level = h.str.getLastWordFromStringUsingSpliter(kind, '-');
            let kindExceptLevelWithSpaceSeparators = h.str.removeLastWordFromStringUsingSplitter(kind, '-');
        
            let element = h.dom.getElement('id', 'inputSectionName');
            let sectionName = h.dom.getAttribute('value', element);
            kind = sectionName + '-section';

            return updateDOMWithDocContent(level, getSection(), kind, kindExceptLevelWithSpaceSeparators, getDB(), 'first');
         }
    };          
}

//Controller
function ButtonAddOneDocOfKindFirstCtrl(view, model) {

    const DOM = view.getDOM();
    
    // input handler
    DOM.element.addEventListener('click', (event) => {
        return model.newSection(event);
    });

    model.register(view, this);

    return {
        notify: function() {
        }
    };
}







var apeProto = Object.create(HTMLElement.prototype);

apeProto.hoot = function() {
  console.warn('Apes are great!');
}


document.registerElement('great-apes', {prototype: apeProto});


var XFooProto = Object.create(HTMLElement.prototype);

XFooProto.createdCallback = function() {
  // 1. Attach a shadow root on the element.
  var shadow = this.createShadowRoot();

  // 2. Fill it with markup goodness.
  shadow.innerHTML = "<b>I'm in the element's Shadow DOM!</b>";
};

var XFoo = document.registerElement('x-foo-shadowdom', {prototype: XFooProto});


var proto = Object.create(HTMLElement.prototype, {
    createdCallback: {
      value: function() {
        let otherTemplatesImport1 = document.getElementById("otherT");
        let otherTemplates1 = otherTemplatesImport1.import;
        let otherTemplate1 = otherTemplates1.getElementById('testTemplate1');
        let otherNode1 = document.importNode(otherTemplate1.content, true);
        this.createShadowRoot().appendChild(otherNode1);
      }
    }
  });
  

  let splitStringToArrayOnDash = h.str.stringToArrayUsingSplitter('-');
  let makeFirstInElementsUpperCase = h.map(h.str.firstLettertoUpperCase);
  let concatArrayToString = h.reduce(h.str.adder, '');
  let makeFirstLowerCase = h.str.firstLettertoLowerCase;


  function createComponent(extendedElement, componentName) {

    let componentNamecC = h.compose(makeFirstLowerCase, concatArrayToString, makeFirstInElementsUpperCase, splitStringToArrayOnDash)(componentName);

    let componentPrototype = Object.create(HTMLDivElement.prototype);

    componentPrototype.createdCallback = function() {
            let templates = document.getElementById('HTMLtemplates').import;
            let template = templates.getElementById(componentNamecC + 'Template');
            let node = document.importNode(template.content, true);
            this.createShadowRoot().appendChild(node);
            this.setKind('section-box');
            };

    componentPrototype.hoot = function() {
        alert('hoot');
    };

    componentPrototype.setId = function(id) {
        h.dom.setAttribute('id', id, this);
    };

    componentPrototype.setKind = function(kind) {
        h.dom.setAttribute('kind', kind, this);
    };

    document.registerElement(componentName, {
        prototype: componentPrototype,
        extends: extendedElement
    });
}

document.addEventListener('DOMContentLoaded', function () {
    let sectionBoxShadow = Object.create(HTMLElement.prototype, {
        createdCallback: {
          value: function() {
            let sectionTemplates = document.getElementById("sectionTemplate").import;
            let sectionTemplate = sectionTemplates.getElementById('sectionTemplate');
            let sectionNode = document.importNode(sectionTemplate.content, true);
            this.createShadowRoot().appendChild(sectionNode);
          }
        }
      });
    


    //createComponent('div', 'section-parmaco');
    



    var ThumbImageProto = Object.create(HTMLImageElement.prototype);
    ThumbImageProto.createdCallback = function() {
        this.width = '100';
        this.height = '100';
    };
    ThumbImageProto.changeImage = function() {
        this.src = 'images/dark_us.jpg';
    };
    var ThumbImage = document.registerElement('thumb-img', {
        prototype: ThumbImageProto,
        extends: 'img'
    });

    var imgElement = h.dom.getElement('id', 'theone');

    imgElement.changeImage();

    // let testImgEl = h.dom.createElement('img');

    // h.dom.setAttribute('is', 'thumb-img', testImgEl);

    // h.dom.appendChildNodeFirstIO(testImgEl, body);

    // testImgEl.changeImage();
    

    
    var apes = document.querySelector('great-apes');
    apes.hoot();

    document.registerElement('x-foo-from-template', {prototype: proto});

    let myComponent1 = h.dom.createElement('x-foo-from-template');
    h.dom.appendChildNodeFirstIO(myComponent1, body);
    // let myComponent2 = h.dom.createElement('x-foo-from-template');
    // h.dom.appendChildNodeFirstIO(myComponent2, body);


    document.querySelector('x-foo-from-template').shadowRoot.querySelector('#divThirdId').innerHTML = "HEJ";


    unitTester.run();

    h.compose(console.log, h.str.toUpperCase, h.str.adder('hej'))('hopp');
    
    let ramdaAdd = R.add(2, 3); 
    console.log(ramdaAdd);

    let ramdaCompose = R.compose(R.toUpper, R.concat('hej'))('hopp'); 
    console.log(ramdaCompose);

    let mixedCompose = h.compose(R.toUpper, R.concat('hej'))('hopp'); 
    console.log(mixedCompose);


    let ramdaPipe = R.pipe(R.toUpper, R.concat('hej'))('hopp'); 
    console.log(ramdaPipe);


    function multiplier(a, b) {
        return a * b;
    }

    function add(a, b) {
        return a + b;
    }

    function square(a) {
        return multiplier(a, a);
    }

    function applyOperation(a, b, opt) {
        return opt(a, b);
    }


    function negate(func) {
        return function() {
            return !func.apply(null, arguments);
        }
    }

    function isThree(a) {
        return a === 3;
    }

    let isNotThree = negate(isThree);

    console.log('Is not three');
    console.log(isNotThree(4, 3));


    function makeAddFunction(amount) {
        function add(number) {
            return number + amount;
        }
        return add;
    }

    function makeExponentialFunction(base) {
        function raise(exponent) {
            return Math.pow(base, exponent);
        }
        return raise;
    }

    var addTenTo = makeAddFunction(10);

    console.log('Adding to 10');
    console.log(addTenTo(3));

    var raiseThreeTo = makeExponentialFunction(3);

    console.log('Raising 3 to');
    console.log(raiseThreeTo(3));


    let oddandUniqueElements = h.filters.oddAndUnique([1, 2, 2, 3, 3, 3, 4, 5]);

    let evenAndUniqueFilter = h.compose(h.filters.even, h.filters.unique);

    let evenAndUniqueElements = evenAndUniqueFilter([1, 2, 2, 3, 3, 3, 4, 5, 6]);

    console.log(evenAndUniqueElements);

    // events.publish('changedValue', doc.kind);

    // let subscription = events.subscribe('changedValue', function(obj) {
    //     console.log('THE RESPONSE ID');
    //     console.log(response.id);
    // });

    events.subscribe('lastRowAdded', function(obj) {
        console.log('last-Row-Added-in listener!!!');
        console.log(obj);
    });


    events.subscribe('lastRowInSection', function (lastRow) {
        lastRowsInSections.push(lastRow);
        console.log('lastRowsInSections');
        console.log(lastRowsInSections);
    });


    var log = [];
    //var remoteCouch = 'http://127.0.0.1:5984/kittens';

    new PouchDB('kittens')
        .destroy()
        // .info()
        .then(function () {
            return new PouchDB('kittens');
        })
        .then(function (db) {
            var controller = [];

            //views.parmaco.createBoxForSection('parent-to-main', db, 'number-of-columns', 'first');
            //views.parmaco.createBoxForRow('number-of-columns-section-box', db, 'number-of-columns', 'first');
            

            var subscription = events.subscribe('changedValue', function (obj) {
                console.log('working');
                console.log(obj);
            });
        
            // events.subscribe('columnAddedToRow', function (obj) {
            //     console.log('columnAddedToRow');
            //     console.log(obj);
            //     let element = h.dom.getElement('id', 'number-of-columns-row-box');
            //     h.dom.appendInnerHTMLIO(obj, element);
            // });
        
            events.subscribe('columnAddedToRow', function (obj) {
                console.log('columnAddedToRow');
                console.log(obj + 15);
                let arrayOfcellIds = getCellIds(controller);

                let rowLengths = arrayOfcellIds.map((cellIds) => {
                    return cellIds.length;
                });

                console.log('rowLengths');
                console.log(rowLengths);

                maxRowLength = Math.max(...rowLengths); // 4
                minRowLength = Math.min(...rowLengths); // 1

                console.log('max min rowLength');
                console.log(maxRowLength, minRowLength);
                let element = h.dom.getElement('id', 'number-of-columns-row-box');
                h.dom.appendInnerHTMLIO('', element);
                views.parmaco.createBoxForElementsOfKind('number-of-columns-row-box', 'number-of-columns', db, 'row');

                let startYear = 2018;
                for (let i = 0; i < maxRowLength; i++)
                    views.parmaco.createCounterElements('number-of-columns-row-elements-box', startYear + i, db, 'last');

                
            });





            /**
             * Cleans main element and rebuilds it again
             * @param {*} db 
             */

            //hej
            function refresh(db) {
                // let element = h.dom.getElement('id', 'main');
                // h.dom.removeAllChildren(element);

                let holderId = 'parent-to-main';
                let kind = 'section';
                views.parmaco.createBoxForButtonsRowFirst(holderId, kind, db);
                let parentId = 'none';
                holderId = 'section-section-buttonsrow-box'
                views.parmaco.createButtonsRowOfKind(holderId, kind, db, parentId);
            }

            function recursiveCellAdder (j, parentIdValue, nameLevel, cellSuffix, numberOfCells) {
                return h.event.addOneDocLastWithFilter(nameLevel + cellSuffix, parentIdValue, db)
                    .then(() => {
                        ++j;
                        if (j < numberOfCells) { //the number of rows to add
                            return recursiveCellAdder (j, parentIdValue, nameLevel, cellSuffix, numberOfCells);
                        } else {  
                            return true;
                        }    
                    }); 
            }

            function recursiveRowAdder (i, parentIdValue, nameLevel, numberOfRows, numberOfCells, recursiveCellAdder, cellSuffix) {   
                return h.event.addOneDocLastWithFilter(nameLevel, parentIdValue, db)
                    .then((row) => {
                        console.log('row before');
                        console.log(row);
                        return recursiveCellAdder(0, row.doc._id, nameLevel, cellSuffix, numberOfCells)
                            .then(() => {
                                ++i;
                                if (i < numberOfRows) {
                                    return recursiveRowAdder (i, parentIdValue, nameLevel, numberOfRows, numberOfCells, recursiveCellAdder, '-element');
                                } else {
                                    return true;     
                                }    
                            });   
                          
                           
                    }); 
            }

            function createDefaultSetup(db, name, numberOfRows, numberOfColumns) {
                return h.event.addOneDocLastWithFilter(name + '-section', 'main', db)
                    .then((row) => {
                        return recursiveRowAdder(0, row.doc._id, name + '-row', numberOfRows, numberOfColumns, recursiveCellAdder, '-element')
                            .then(() => {
                                return recursiveRowAdder(0, row.doc._id, name + '-row', 1, numberOfColumns, recursiveCellAdder, '-summary');
                            });
                    });
                    
            }

            
            
            createDefaultSetup(db, 'electricity', 2, 2)
                // .then(() => {
                //     return createDefaultSetup(db, 'rent', 3, 4);
                // })
                // .then(() => {
                //     return createDefaultSetup(db, 'maintenance', 4, 4);
                // })
                // .then(() => {
                //     return createDefaultSetup(db, 'ice', 2, 2);
                // })
                // .then(() => {
                //     return createDefaultSetup(db, 'earth', 3, 5);
                // })
                .then(() => {
                    return h.pouch.getAllRowsWithLevel(db, 'section')
                        .then((rows) => {
                            console.log(rows);
                            let rowPointingAtFirst = h.pouch.getRowPointingAtFirst(rows, 'previousV');
                            return addSectionsToController(rowPointingAtFirst, rows, controller, 'last', db);
                        }); 
                })
                .then(() => {
                    return h.pouch.getAllRowsWithLevel(db, 'row')
                        .then((rows) => {
                            console.log(rows);
                            let rowsPointingAtFirst = h.pouch.getRowsPointingAtFirst(rows, 'previousV');
                            return addRowsToController(rowsPointingAtFirst, rows, controller, 'last', db);
                        }); 
                })
                .then(() => {
                    return h.pouch.getAllRowsWithLevel(db, 'element')
                        .then((rows) => {
                            console.log('ElementROWS');
                            console.log(rows);
                            let rowsPointingAtFirst = h.pouch.getRowsPointingAtFirst(rows, 'previousH');
                            return addCellsToController(rowsPointingAtFirst, rows, controller, 'last', db);
                        }); 
                })
                .then(() => {
                    console.log('CONTROLLLER!');
                    console.log(controller);

                
                                    // .then((row) => {
                    //     console.log('Doc Posted');
                    //     console.log(row);
                    //     //console.log('four');
                    //     return addToController(row, db, 'element', 'last', controller);  
                    // })
                    // .then((row) => {
                    //     console.log('Doc Posted');
                    //     console.log(row);
                    //     //console.log('four');
                    //     return addToController(row, db, 'section', 'last', controller);  
                    // })

                    // .then((row) => {
                    //     console.log('Doc Posted');
                    //     console.log(row);
                    //     //console.log('four');
                    //     return addToController(row, db, 'row', 'last', controller);  
                    // })

                    
                    // let sections = controller;
                    let sectionIds = controller.map((section) => {
                        return Object.keys(section)[0];
                    });

                    console.log('sectionIds');
                    console.log(sectionIds);


                    let rowIds = sectionIds.map((sectionId) => {
                        return getRowIdsFromSectionId(controller, sectionId);
                    });

                    rowIds = h.arr.flatten(rowIds);




                    let summaryRowIds = sectionIds.map((sectionId) => {
                        return getSummaryRowIdFromSectionId(controller, sectionId);
                    });

                    


                    console.log('rowIds');
                    console.log(rowIds);


                    console.log('summaryRowIds');
                    console.log(summaryRowIds);


                    let summaryCellIdsFromSummaryRowIds = summaryRowIds.map((summaryRowId) => {
                        return getCellIdsFromSummaryRowId(controller, summaryRowId);
                    });

                    let summaryCellIdsFromRowIds = rowIds.map((rowId) => {
                        console.log('THEROWID');
                        console.log(rowId);
                        return getSummaryCellIdsFromRowId(controller, rowId);
                    });

                    summaryCellIdsFromSummaryRowIds = h.arr.flatten(summaryCellIdsFromSummaryRowIds);

                    console.log('summaryCellIdsFromSummaryRowIds');
                    console.log(summaryCellIdsFromSummaryRowIds);

                    summaryCellIdsFromRowIds = h.arr.flatten(summaryCellIdsFromRowIds);

                    console.log('summaryCellIdsFromRowIds');
                    console.log(summaryCellIdsFromRowIds);

                    


                    let summaryCellIds = summaryCellIdsFromSummaryRowIds.concat(summaryCellIdsFromRowIds);

                    console.log('summaryCellIds');
                    console.log(summaryCellIds);


                    


                    let cellIds = rowIds.map((rowId) => {
                        return getCellIdsFromRowId(controller, rowId);
                    });

                    cellIds = h.arr.flatten(cellIds);

                    console.log('cellIds');
                    console.log(cellIds);


                    

                    


                    //let rowIds = getRowIdsFromSectionId(controller, sectionIds[0]);


                    let sectionDocs = sectionIds.map((sectionId) => {
                        return h.pouch.getDoc(sectionId, db);
                    });

                    let summaryRowDocs = summaryRowIds.map((summaryRowId) => {
                        return h.pouch.getDoc(summaryRowId, db);
                    });

                    let summaryCellDocs = summaryCellIds.map((summaryCellId) => {
                        return h.pouch.getDoc(summaryCellId, db);
                    });

                    let rowDocs = rowIds.map((rowId) => {
                        return h.pouch.getDoc(rowId, db);
                    });

                    let cellDocs = cellIds.map((cellId) => {
                        return h.pouch.getDoc(cellId, db);
                    });

                    console.log('controller!!');
                    console.log(controller);


                    Promise.all(sectionDocs)
                        .then((docs) => {
                            console.log(docs);

                            docs.forEach((doc) => {
                                let sectionName = h.str.removeLastWordFromStringUsingSplitterAndKeepSplitters(doc.kind, '-');
                                let order = 'last';
                                let docId = doc._id;
                                views.parmaco.createSection(sectionName, db, order, docId, doc, controller);
                            });

                        })
                        .then(() => {
                            return Promise.all(rowDocs)
                                .then((docs) => {
                                    docs.forEach((doc) => {
                                        let sectionName = h.str.removeLastWordFromStringUsingSplitterAndKeepSplitters(doc.kind, '-');
                                        let order = 'last';
                                        let docId = doc._id;
                                        views.parmaco.createRow(sectionName, db, order, docId, doc);
                                    });
                                });
                        })
                        .then(() => {
                            return Promise.all(summaryRowDocs)
                                .then((docs) => {
                                    docs.forEach((doc) => {
                                        let sectionName = h.str.removeLastWordFromStringUsingSplitterAndKeepSplitters(doc.kind, '-');
                                        let order = 'last';
                                        let docId = doc._id;
                                        views.parmaco.createRow(sectionName, db, order, docId, doc);
                                    });
                                });
                        })


                        
                        .then(() => {
                            return Promise.all(summaryCellDocs)
                                .then((docs) => {
                                    console.log('numberOfSummaryDocs');
                                    console.log(docs);
                                    docs.forEach((doc) => {
                                        function showYear() {
                                            return maxRowLength;
                                        }
                                        let order = 'last';
                                        let docId = doc._id;
                                        let parentId = doc.parentId;
                                        console.log('summary Cells ParentID');
                                        console.log(parentId);
                                        views.parmaco.createElementOfKind(parentId + '-row-elements-box', docId, db, doc, order, controller, 'noteditable');
                                        //views.parmaco.createColumnAdderElement(parentId + '-row-elements-box', showYear, db, 'last', doc, doc.positionH);
                                    });
                                });
                        })
                        .then(() => {
                            return Promise.all(cellDocs)
                                .then((docs) => {
                                    console.log('numberOfNormalDocs');
                                    console.log(docs);
                                    docs.forEach((doc) => {
                                        let order = 'last';
                                        let docId = doc._id;
                                        let parentId = doc.parentId;
                                        views.parmaco.createElementOfKind(parentId + '-row-elements-box', docId, db, doc, order, controller, 'editable');
                                    });
                                });
                        })
                        .then(() => {

                //     var data = {
                //         // A labels array that can contain any sort of values
                //         labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                //         // Our series array that contains series objects or in this case series data arrays
                //         series: [
                //         [5, 2, 4, 2, 0]
                //         ]
                //     };

                //     var options = {
                //         width: 300,
                //         height: 200
                //       };
                  
                //   // Create a new line chart object where as first parameter we pass in a selector
                //   // that is resolving to our chart container element. The Second parameter
                //   // is the actual data object.
                //   new Chartist.Line('.ct-chart', data, options);
                            // lastRowsInSections.forEach((lastRowInSection) => {
                            //     console.log('lastRowInSection.doc._id');
                            //     console.log(lastRowInSection.doc._id);
                            //     let ourElement = h.dom.getElement('id', lastRowInSection.doc._id + '-row-elements-box');
                            //     console.log('ourElement');
                            //     console.log(ourElement);

                            //     function showYear() {
                            //         return maxRowLength;
                            //     }

                            //     let startYear = 2018;
                            //     for (let i = 0; i < maxRowLength; i++)
                            //         views.parmaco.createColumnAdderElement(lastRowInSection.doc._id + '-row-elements-box', showYear, db, 'last', lastRowInSection.doc, i + 1);
                            // });
                        });
                    // console.log('sectionIds');
                    // console.log(sectionIds); 
                


                });













                


                // createDefaultSetup(db, 'water')
                // .then(() => {
                //     return setTimeout(function() {
                //         return createDefaultSetup(db, 'fire');}
                //         , 2000);
                //     //return createDefaultSetup(db, 'fire');
                // })
                // .then(() => {
                //     return setTimeout(function() {
                //         return createDefaultSetup(db, 'ice');}
                //         , 4000);
                //     //return createDefaultSetup(db, 'fire');
                // })
                // .then(() => {
                //     return setTimeout(function() {
                //         return createDefaultSetup(db, 'earth');}
                //         , 6000);
                //     //return createDefaultSetup(db, 'fire');
                // })
                // .then(() => {
                //     return setTimeout(function() {
                //         let firstSection = controller[0];
                //         let firstSectionId = Object.keys(firstSection)[0];
                //         console.log('firstSectionId');
                //         console.log(firstSectionId);
                //     }, 8000);
                    
                // });

                //refresh(db);



            // function recursiveRowAdder (i, parentIdValue, nameLevel, n) {   
            //     return h.event.addOneDocLastWithFilter(nameLevel, parentIdValue, db)
            //         .then((row) => {

            //             function recursiveCellAdder (j, parentIdValue2, nameLevel2, n2) {   
            //                 return h.event.addOneDocLastWithFilter(nameLevel2, parentIdValue2, db)
            //                     .then((row) => {
            
            //                         //i = i + 1;
            //                         ++j;
            //                         if (j < n2) { //the number of rows to add
            //                             return recursiveCellAdder (j, parentIdValue2, nameLevel2, n2);
            //                         } else {
            //                             return true;
            //                         }    
            //                     }); 
            //             }

            //             recursiveCellAdder(0, row.doc._id, 'water-row-element', 4)
            //                 .then(() => {
            //                     //i = i + 1;
            //                     ++i;
            //                     if (i < n) { //the number of rows to add
            //                         return recursiveRowAdder (i, parentIdValue, nameLevel, n);
            //                     } else {
            //                         return true;
            //                     }    
            //                 });

                        
            //         }); 
            // }






            // function recursiveRowAdderWORKING (i, parentIdValue, nameLevel, n) {   
            //     return h.event.addOneDocLastWithFilter(nameLevel, parentIdValue, db)
            //         .then((row) => {

            //             //i = i + 1;
            //             ++i;
            //             if (i < n) { //the number of rows to add
            //                 return recursiveRowAdder (i, parentIdValue, nameLevel, n);
            //             } else {
            //                 return true;
            //             }    
            //         }); 
            // }
            


            // getChainedRowsOfKind(db, 'rent')
            // .then((filteredChainedRows) => {
            //     let result;
            //     console.log(filteredChainedRows);
            //     console.log('filteredChainedRows');
            //     result = filteredChainedRows.reduce((added, filteredChainedRow) => {
            //         console.log(added);
            //         return added + h.str.convertStringToNumber(filteredChainedRow.doc.elementValue);
            //     }
            //     , 0);

            //     alert(result);
            // });

            // db.sync(remoteCouch, {
            //     live: true,
            //     retry: true,
            //     conflicts: true,
            //     include_docs: true
            // })
            //     .on('change', function (info) {

            //         info.syncTime = new Date().toISOString();
            //         log.push(info);


            //         if ((info.direction == 'pull') && (info.change.docs.length < 2)) {
            //             console.log('Normal pull');
            //             // console.log(info);
            //             // console.log(info.change.docs[0]);
            //             info.change.docs.forEach((doc) => ChoosePulledOrExistingRev(doc));

            //         } else if ((info.direction == "pull") && (info.change.docs.length > 1)) {
            //             console.log("Bulk pull");
            //             //console.log(info);
            //             // console.log(info.change.docs);
            //             // myFunction(info.change.docs);
            //             info.change.docs.forEach((doc) => ChoosePulledOrExistingRev(doc));

            //         } else if ((info.direction == "push") && (info.change.docs.length < 2)) {
            //             console.log("Normal push");
            //             console.log(info);
            //             //refresh(db);
            //         } else if ((info.direction == "push") && (info.change.docs.length > 1)) {
            //             console.log("Bulk push");
            //             console.log(info);

            //         } else {
            //             console.log('NOT ANY OF THE PUSH AND PULLS');
            //             console.log(log);
            //         }



            //         //h.pouch.fetchAll(db).then((countries) => displayList(countries, 'countries', db));

            //         // h.pouch.fetchAll(db)
            //         // .then((countries) => displayList(countries, 'countries', db))
            //         // .then(() => db.sync(remoteCouch, { conflicts: true, include_docs: true}))
            //         // .then(function() {
            //         //     console.log('sy');
            //         //     h.pouch.fetchAll(db).then((countries) => displayList(countries, 'countries', db));
            //         // });


            //     }).on('paused', function (info) {
            //         //     //console.log(new Date().toISOString());
            //         console.log('PAUSED');
            //     }).on('active', function () {
            //         console.log('ACTIVE');
            //         // replicate resumed (e.g. new changes replicating, user went back online)
            //     }).on('denied', function (err) {
            //         console.log('DENIED');
            //         // a document failed to replicate (e.g. due to permissions)
            //     }).on('complete', function (info) {
            //         console.log('COMPLETE');
            //         // handle complete
            //     }).on('error', function (err) {
            //         console.log('ERROR');
            //         // handle error
            //     });

        });
}, false);


//   let dataChartArray = [];
//   let chartDocs = [];
//   dataChartArray = [
//       {
//           serie: 5,
//           label: 2016
//       },
//       {
//         serie: 6,
//         label: 2014
//     },
//     {
//         serie: 1,
//         label: 2015
//     },
//     {
//         serie: 5,
//         label: 2018
//     },
//     {
//         serie: 3,
//         label: 2017
//     }
//   ]



//   chartRecursive(dataChartArray);

//   function chartRecursive(chartArray) {

//       //Create doc and sets attributes
//       let doc = {
//           dbName: db.name,
//           _id: new Date().toISOString(),
//           written: new Date().toISOString(),
//           chartData: chartArray[0],
//           kind: "chart-data"
//       };




//       //adds to mydocs
//       chartDocs.push(doc);
//       //wait function
//       setTimeout(function () {
//           if (chartArray.length > 1) {
//               chartRecursive(chartArray.slice(1));
//           } else {
//               console.log(chartDocs);
//               db.bulkDocs(chartDocs);
//           }
//       }, 1);

//   };


//   chartRecursive2(dataChartArray);

//   function chartRecursive2(chartArray) {

//       //Create doc and sets attributes
//       let doc = {
//           dbName: db.name,
//           _id: new Date().toISOString(),
//           written: new Date().toISOString(),
//           chartid: chartArray[0],
//           kind: "chart-id"
//       };




//       //adds to mydocs
//       chartDocs.push(doc);
//       //wait function
//       setTimeout(function () {
//           if (chartArray.length > 1) {
//               chartRecursive2(chartArray.slice(1));
//           } else {
//               console.log(chartDocs);
//               db.bulkDocs(chartDocs);
//           }
//       }, 1);

//   };

//   function compare(a,b) {
//     if (a.chartData.label < b.chartData.label)
//       return -1;
//     if (a.chartData.label > b.chartData.label)
//       return 1;
//     return 0;
//   }



//   db.createIndex({
//     index: {fields: ['kind']}
//   })
//   .then((result) => {
//     db.find({
//         selector: {
//             kind: {$eq: 'chart-data'}
//         }
//       })
//   .then((selected) => {
//     console.log("selected");
//       console.log(selected.docs);
//       console.log(selected.docs.sort(compare));



//       let sortedLabels = selected.docs.map((item) => {
//         return item.chartData.label;
//      });

//      let sortedSeries = selected.docs.map((item) => {
//         return item.chartData.serie;
//      });

//      console.log("sortedSeries");
//      console.log(sortedSeries);
//      console.log(sortedLabels);

//       var chartData = {

//         labels: sortedLabels,

//         series: [
//             sortedSeries
//         ]

//     };
//     var options = {high: 10,
//         low: -10,
//         axisX: {
//           labelInterpolationFnc: function(value, index) {
//             return index % 4 === 0 ? value : null;
//           }
//         }
//     }

//     // var options = {
//     //     width: 300,
//     //     hight: 200
//     // };

//     new Chartist.Bar('.ct-chart', chartData, options);



//   });
// });

//     new Chartist.Bar('.ct-chart', chartData, options);



//   });
// });


//     var chartData = {

//         labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

//         series: [
//             [4, 5, 7, 2, -1, -4],
//             [1, 3, 5, 2, -2, -3]
//         ]
//     };
//     var options = {high: 10,
//         low: -10,
//         axisX: {
//           labelInterpolationFnc: function(value, index) {
//             return index % 4 === 0 ? value : null;
//           }
//         }
//     }

//     // var options = {
//     //     width: 300,
//     //     hight: 200
//     // };

//     new Chartist.Bar('.ct-chart', chartData, options);


//     //DONE
// function editDoc(doc, newValue, db) {
//     return new Promise(function (resolve, reject) {
//         doc.country = newValue;
//         doc.written = new Date().toISOString();
//         resolve(db.put(doc));
//     });
// }


// //DONE
// function putDoc(newValue, docId, db) {
//     return h.pouch.getDoc(docId, db)
//         .then((doc) => editDoc(doc, newValue, db))
//         .catch((err) => console.log(err));
// }



// //Done
// function putAndReload(docId, id, db) {
//     getValueFromField('editField-', docId)
//         .then((value) => putDoc(value, docId, db))

//         .catch(function () {
//             console.log('error');
//         });
// }



// //DONE
// /**
//  * Creates a document with id, country, written
//  * @param {*} value 
//  * @param {*} db 
//  */
// function postDoc(value, db) {
//     return new Promise(function (resolve, reject) {
//         let doc = {
//             dbName: db.name,
//             _id: new Date().toISOString(),
//             country: value,
//             written: new Date().toISOString(),
//             kind: "country"
//         };
//         resolve(db.put(doc));
//     });
// }


// //DONE
// function deleteAndReload(docId, id, db) {
//     h.pouch.deleteDocById(docId, db)

//         .catch(function () {
//             console.log('error');
//         });
// }


// function fetchAllAndUpdate() {
//     h.pouch.fetchAll(db)
//         .then((docs) => displayList(docs, 'countries', db));
// }



// //DONE     
// function postAndReload(domId, db) {
//     getValueFromField('', 'add-name')
//         .then((value) => postDoc(value, db))
//         .catch(function () {
//             console.log('error');
//         });
// }


// //DONE
// function getValueFromField(domIdPrefix, domIdSuffix) {
//     return new Promise(function (resolve, reject) {
//         var el = document.getElementById(domIdPrefix + domIdSuffix);
//         var value = el.value;
//         if (value) {
//             el.value = '';
//             resolve(value);
//         }
//     });
// }


/// SKA BARA GÖRA EN RAD I TAGET - ÄNDRA ÄVEN FRÅN TABLE TILL DIV
// function displayList(countries, id, db) {
//     // console.log('db');
//     // console.log(db);
//     //var el = document.getElementById(id);
//     var el = h.dom.getElement('id', id);

//     let data = '';
//     el.innerHTML = data;
//     if (countries.rows.length > 0) {
//         for (var i = 0; i < countries.rows.length; i++) {
//             let data = '';

//             data += '<td>' + countries.rows[i].doc.country + '</td>';
//             data += '<td><input type="text" id="' + "editField-" + countries.rows[i].doc._id + '"><button id="' + "editButton-" + countries.rows[i].doc._id + '">Edit</button></td>';
//             data += '<td><input type="text" id="' + "deleteField-" + countries.rows[i].doc._id + '"><button id="' + "deleteButton-" + countries.rows[i].doc._id + '">Delete</button></td>';

//             let tblrow = h.dom.createElement('tr');
//             tblrow.innerHTML = data;
//             //el.innerHTML += data;

//             let editField = tblrow.children[1].children[0];
//             let editButton = tblrow.children[1].children[1];

//             editButton.addEventListener('click', function () {
//                 //console.log('db in event listener');
//                 //console.log(db);
//                 putAndReload(editField.getAttribute('id').slice(10), 'countries', db);
//             });


//             let deleteField = tblrow.children[2].children[0];
//             let deleteButton = tblrow.children[2].children[1];

//             deleteButton.addEventListener('click', function () {
//                 deleteAndReload(deleteField.getAttribute('id').slice(12), 'countries', db);
//             });

//             //console.log(tblrow.children[0].children[1].children[0].getAttribute('id'));

//             el.appendChild(tblrow);
//         }
//     }


//     return el;
// }



// /**
//  * Saves info from DOM to db
//  * @param {*} element DOM element
//  * @param {*} dataKind DOM elements attribute
//  * @param {*} serializedFunction function connected to element
//  */
// function updateDBWithElementValue(element, dataKind, serializedFunction, db) {
//     return new Promise(function (resolve, reject) {
//         let doc;
//         let dbId = h.dom.getAttribute('db-id', element);

//         console.log('dbID: ', dbId);

//         if (dbId === "") {
//             //prepares for database
//             doc = {
//                 dbName: db.name,
//                 _id: new Date().toISOString(),
//                 elementId: h.dom.getAttribute('id', element),
//                 elementValue: element.value,
//                 elementFunction: serializedFunction,
//                 written: new Date().toISOString(),
//                 kind: dataKind
//             };

//             db.put(doc)
//                 .then(() => {
//                     resolve();
//                 })

//             //pushes the update into document

//             //Sets database document id on element
//             h.dom.setAttribute("db-id", doc._id, element);
//         } else {
//             //gets doc from db and updates element from DOM value...
//             console.log('dbID: ', dbId);

//             h.pouch.getDoc(dbId, db)
//                 .then((doc) => {
//                     if (doc.elementValue !== element.value) {
//                         //updates document value on database
//                         doc.elementValue = element.value;
//                         //updates written 
//                         doc.written = new Date().toISOString();
//                         db.put(doc);
//                     }

//                     return doc;
//                 })
//                 .then((doc) => {
//                     console.log(doc);
//                     resolve();
//                 });
//         }
//     });
// }


// function addOneDocLastWithFilter(kind, level, db) {

//     let elementIdPrefix = 'level' + level + '-' + kind;

//     return h.pouch.getAllRowsOfLevel(db, level)
//         //search for the last row
//         .then((filteredRows) => {

//             let lastRow = [];
//             lastRow = filteredRows.filter((filteredRow) => {
//                 return filteredRow.doc.nextV === 'last'; //next vertical
//             });
//             return (lastRow);
//         })
//         //defines previous id form db
//         .then((lastRow) => {

//             let previousV;

//             if (h.boolean.isEmpty(lastRow)) {
//                previousV = 'first';
//             } else {
//                 previousV = lastRow[0].doc._id;
//             }
//             //gets last element id number from DOM
//             return h.pouch.getNewElementIdNumber(db, elementIdPrefix) //may bee new name newLastElementIdNumber??
//                 .then((newElementIdNumber) => {

//                     //creates new document attributes in db
//                     let attributes = [
//                         {
//                             key: 'elementIdNumber',
//                             value: newElementIdNumber
//                         },
//                         {
//                             key: 'elementValue',
//                             value: ""
//                         },
//                         {
//                             key: 'previousV',
//                             value: previousV
//                         },
//                         {
//                             key: 'nextV',
//                             value: 'last'
//                         },
//                         {
//                             key: 'kind',
//                             value: kind
//                         },
//                         {
//                             key: 'elementId',
//                             value: elementIdPrefix + "-" + newElementIdNumber
//                         },
//                         {
//                             key: 'level',
//                             value: level
//                         },
//                         {
//                             key: 'label',
//                             value: 'Our ' + kind + ' section'
//                         }
//                     ];
//                     //creates new doc to be posted in db
//                     return h.pouch.createDoc(db, attributes);
//                 })
//                 //post new doc to db
//                 .then((doc) => {
//                     return h.pouch.postDoc(doc, db);
//                 })
//                 //if not empty let previous doc's 'next' attribute be the new 'last' doc's id
//                 .then((response) => {
//                     if (!h.boolean.isEmpty(lastRow)) {
//                         return h.pouch.editDocByIdAndPut(previousH, db, [{
//                             key: 'nextV',
//                             value: response.id
//                         }]);
//                     }
//                 })
//                 //gets latest row from db
//                 .then(() => {
//                     return h.pouch.getLatestRowOfLevel(db, level);
//                 });


//         });
// }

// /**
//          * Creates DOM element of specified kind with info from row in db and places it last
//          * @param holderId the id of the parent
//          * @param kind kind of user data (rent...)
//          * @param db the database
//          * @param row db row
//          */
//         function createElementOfKindLast(holderId, kind, db, row) {
//             let holderElement = h.dom.getElement("id", holderId);
//            let element = views.parmaco.createSection('rent', db, 'last');
//             h.dom.appendChildNodeIO(element, holderElement);
//         }