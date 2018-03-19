var views = {};
(function() {

    this.parmaco = {

                       /**
         * Builds elements horisontally in DOM
         * @param title the title above the element
         * @param db the db
         * @param filteredRow the row from db
         */
        columnAdder: my.curry(function(title, db, fn) {

            let element4 = fn();




            let info3 = new h.dom.ElementInfoConstructor();
            info3.kind = 'div';
    
            info3.attribute.push({
                key: 'class',
                value: 'text-block'
            });
    
            let element3 = h.dom.elementBuilder(info3, db);
    
            h.dom.appendInnerHTMLIO(element4, element3);
    

            let info2 = new h.dom.ElementInfoConstructor();
            info2.kind = 'div';
    
            info2.attribute.push({
                key: 'class',
                value: 'text-box'
            });
    
            let element2 = h.dom.elementBuilder(info2, db);

    
            h.dom.appendChildNodeIO(element3, element2);
    
    
            let info1 = new h.dom.ElementInfoConstructor();
            info1.kind = 'div';
    
            info1.attribute.push({
                key: 'class',
                value: 'form-box'
            });
    
            let element1 = h.dom.elementBuilder(info1, db);
    
            h.dom.appendChildNodeIO(element2, element1);
    
    
            let info4 = new h.dom.ElementInfoConstructor();
            info4.kind = 'input';
    
            info4.attribute.push({
                key: 'class',
                value: 'w-input'
            });
    
            info4.attribute.push({
                key: 'type',
                value: 'text'
            });

            let extraAttributes = [
                {
                    key: 'placeholder',
                    value: 'Enter something here...'
                },
                {
                    key: 'value',
                    value: 0
                }
            ];

            let extraEvents = [
                {
                    key: 'click',
                    value: h.event.detectClickFunction
                },
                {
                    key: 'keypress',
                    value: h.event.detectKeybordFunction
                },
                {
                    key: 'blur',
                    value: h.event.detectBlurFunction
                }
            ];
            
            extraAttributes.forEach((item) => {
                info4.attribute.push(item);
            });

            extraEvents.forEach((item) => {
                info4.event.push(item);
            });

    
            element4 = h.dom.elementBuilder(info4, db);
    
    
            info3 = new h.dom.ElementInfoConstructor();
            info3.kind = 'form';
    
            info3.attribute.push({
                key: 'class',
                value: 'input-form'
            });
    
            element3 = h.dom.elementBuilder(info3, db);
    
            h.dom.appendChildNodeIO(element4, element3);
    
    
            info2 = new h.dom.ElementInfoConstructor();
            info2.kind = 'form';
    
            info2.attribute.push({
                key: 'class',
                value: 'form-block w-form'
            });
    
            element2 = h.dom.elementBuilder(info2, db);
    
            h.dom.appendChildNodeIO(element3, element2);
    
    
            h.dom.appendChildNodeIO(element2, element1);


            let info0 = new h.dom.ElementInfoConstructor();
            info0.kind = 'div';
    
            info0.attribute.push({
                key: 'class',
                value: 'forms-box'
            });


            let element0 = h.dom.elementBuilder(info0, db);
    
            h.dom.appendChildNodeIO(element1, element0);


            return element0;
        }),


                /**
         * Builds elements horisontally in DOM
         * @param title the title above the element
         * @param db the db
         * @param filteredRow the row from db
         */
        counters: my.curry(function(title, db, counter) {

            let element4 = counter;

            let info3 = new h.dom.ElementInfoConstructor();
            info3.kind = 'div';
    
            info3.attribute.push({
                key: 'class',
                value: 'text-block'
            });
    
            let element3 = h.dom.elementBuilder(info3, db);
    
            h.dom.appendInnerHTMLIO(element4, element3);
    

            let info2 = new h.dom.ElementInfoConstructor();
            info2.kind = 'div';
    
            info2.attribute.push({
                key: 'class',
                value: 'text-box'
            });
    
            let element2 = h.dom.elementBuilder(info2, db);

    
            h.dom.appendChildNodeIO(element3, element2);
    
    
            let info1 = new h.dom.ElementInfoConstructor();
            info1.kind = 'div';
    
            info1.attribute.push({
                key: 'class',
                value: 'form-box'
            });
    
            let element1 = h.dom.elementBuilder(info1, db);
    
            h.dom.appendChildNodeIO(element2, element1);
    
    
            let info4 = new h.dom.ElementInfoConstructor();
            info4.kind = 'input';
    
            info4.attribute.push({
                key: 'class',
                value: 'w-input'
            });
    
            info4.attribute.push({
                key: 'type',
                value: 'text'
            });

            let extraAttributes = [
                {
                    key: 'placeholder',
                    value: counter
                },
                {
                    key: 'value',
                    value: counter
                }
            ];

            let extraEvents = [
                {
                    key: 'click',
                    value: h.event.detectClickFunction
                },
                {
                    key: 'keypress',
                    value: h.event.detectKeybordFunction
                },
                {
                    key: 'blur',
                    value: h.event.detectBlurFunction
                }
            ];
            
            extraAttributes.forEach((item) => {
                info4.attribute.push(item);
            });

            extraEvents.forEach((item) => {
                info4.event.push(item);
            });

    
            element4 = h.dom.elementBuilder(info4, db);
    
    
            info3 = new h.dom.ElementInfoConstructor();
            info3.kind = 'form';
    
            info3.attribute.push({
                key: 'class',
                value: 'input-form'
            });
    
            element3 = h.dom.elementBuilder(info3, db);
    
            h.dom.appendChildNodeIO(element4, element3);
    
    
            info2 = new h.dom.ElementInfoConstructor();
            info2.kind = 'form';
    
            info2.attribute.push({
                key: 'class',
                value: 'form-block w-form'
            });
    
            element2 = h.dom.elementBuilder(info2, db);
    
            h.dom.appendChildNodeIO(element3, element2);
    
    
            h.dom.appendChildNodeIO(element2, element1);


            let info0 = new h.dom.ElementInfoConstructor();
            info0.kind = 'div';
    
            info0.attribute.push({
                key: 'class',
                value: 'forms-box'
            });


            let element0 = h.dom.elementBuilder(info0, db);
    
            h.dom.appendChildNodeIO(element1, element0);


            return element0;
        }),

        /**
         * Builds elements horisontally in DOM
         * @param title the title above the element
         * @param db the db
         * @param filteredRow the row from db
         */
        form: my.curry(function(title, db, doc, editable) {

            let element4 = doc.positionH;

            let info3 = new h.dom.ElementInfoConstructor();
            info3.kind = 'div';
    
            info3.attribute.push({
                key: 'class',
                value: 'text-block'
            });
    
            let element3 = h.dom.elementBuilder(info3, db);
    
            h.dom.appendInnerHTMLIO(element4, element3);
    

            let info2 = new h.dom.ElementInfoConstructor();
            info2.kind = 'div';
    
            info2.attribute.push({
                key: 'class',
                value: 'text-box'
            });
    
            let element2 = h.dom.elementBuilder(info2, db);

    
            h.dom.appendChildNodeIO(element3, element2);
    
    
            let info1 = new h.dom.ElementInfoConstructor();
            info1.kind = 'div';
    
            info1.attribute.push({
                key: 'class',
                value: 'form-box'
            });
    
            let element1 = h.dom.elementBuilder(info1, db);
    
            h.dom.appendChildNodeIO(element2, element1);
    

            const cellModel = new CellModel(doc, db, editable);
            const cellView = new CellView(cellModel);
            const cellCtrl = new CellCtrl(cellView, cellModel);

    
    
            info3 = new h.dom.ElementInfoConstructor();
            info3.kind = 'form';
    
            info3.attribute.push({
                key: 'class',
                value: 'input-form'
            });
    
            element3 = h.dom.elementBuilder(info3, db);
    
            //h.dom.appendChildNodeIO(element4, element3);

            h.dom.appendChildNodeIO(cellView.getDOM().cellElement, element3);
    
    
            info2 = new h.dom.ElementInfoConstructor();
            info2.kind = 'form';
    
            info2.attribute.push({
                key: 'class',
                value: 'form-block w-form'
            });
    
            element2 = h.dom.elementBuilder(info2, db);
    
            h.dom.appendChildNodeIO(element3, element2);
    
    
            h.dom.appendChildNodeIO(element2, element1);


            let info0 = new h.dom.ElementInfoConstructor();
            info0.kind = 'div';
    
            info0.attribute.push({
                key: 'class',
                value: 'forms-box'
            });

            info0.attribute.push({
                key: 'id',
                value: doc._id + '-element-box'
            });

            info0.attribute.push({
                key: 'contained-dbid',
                value: doc._id
            });

            info0.attribute.push({
                key: 'container',
                value: doc.kind
            });

            info0.attribute.push({
                key: 'kind',
                value: 'element-box'
            });

            info0.attribute.push({
                key: 'parentid',
                value: doc.parentId + '-row-box'
            });

            let element0 = h.dom.elementBuilder(info0, db);
    
            h.dom.appendChildNodeIO(element1, element0);


            return element0;
        }),


        /**
         * Creates an add one button first
         * @param holderElement the element box
         * @param kind kind of user data (rent...)
         * @param db the database
         */
        createButtonAddOneDocOfKindFirst: my.curry(function (kind, db, holderElement, parentId) {

            const buttonAddOneDocOfKindFirstModel = new ButtonAddOneDocOfKindFirstModel(db);
            const buttonAddOneDocOfKindFirstView = new ButtonAddOneDocOfKindFirstView(buttonAddOneDocOfKindFirstModel, kind, parentId);
            const buttonAddOneDocOfKindFirstCtrl = new ButtonAddOneDocOfKindFirstCtrl(buttonAddOneDocOfKindFirstView, buttonAddOneDocOfKindFirstModel);

            //let holderElement = h.dom.getElement('id', holderId);

            h.dom.appendChildNodeIO(buttonAddOneDocOfKindFirstView.getDOM().element, holderElement);

            //buttonAddOneDocOfKindFirstModel.newData();



            
            return h.dom.appendChildNodeIO(buttonAddOneDocOfKindFirstView.getDOM().element, holderElement);
        }),

        //DONE
        /**
         * Creates an add one button
         * @param holderElement the element box
         * @param kind kind of user data (rent...)
         * @param db the database
         */
        createButtonAddOneDocOfKindLast: my.curry(function (kind, db, holderElement, parentId) {
            let buttonElement;
            let elementInfo;

            elementInfo = new h.dom.ElementInfoConstructor();
            elementInfo.kind = 'button';

            elementInfo.attribute.push({
                key: 'kind',
                value: kind
            });

            elementInfo.attribute.push({
                key: 'parentId',
                value: parentId
            });

            elementInfo.event.push({
                key: 'click',
                value: h.event.addOneDocLastFromEvent
            });

            buttonElement = h.dom.elementBuilder(elementInfo, db);
            h.dom.appendInnerHTMLIO('Add one ' + kind + 'last', buttonElement);
            return h.dom.appendChildNodeIO(buttonElement, holderElement);
        }),

        //DONE
        createButtonRemoveLastDocOfKind: my.curry(function (kind, db, parentElement, parentId) {
            let buttonElement;
            let elementInfo;

            elementInfo = new h.dom.ElementInfoConstructor();
            elementInfo.kind = 'button';

            elementInfo.attribute.push({
                key: 'kind',
                value: kind
            });

            elementInfo.attribute.push({
                key: 'parentId',
                value: parentId
            });

            elementInfo.event.push({
                key: 'click',
                value: h.event.deleteLastDocWithFilter
            });

            buttonElement = h.dom.elementBuilder(elementInfo, db);
            h.dom.appendInnerHTMLIO('remove last ' + kind, buttonElement);
            return h.dom.appendChildNodeIO(buttonElement, parentElement);
        }),

        createButtonRemoveFirstDocOfKind: my.curry(function (kind, db, parentElement, parentId) {
            let buttonElement;
            let elementInfo;

            elementInfo = new h.dom.ElementInfoConstructor();
            elementInfo.kind = 'button';

            elementInfo.attribute.push({
                key: 'kind',
                value: kind
            });

            elementInfo.attribute.push({
                key: 'parentId',
                value: parentId
            });

            elementInfo.event.push({
                key: 'click',
                value: h.event.deleteFirstDocFromEvent
            });

            buttonElement = h.dom.elementBuilder(elementInfo, db);
            h.dom.appendInnerHTMLIO('remove first ' + kind, buttonElement);
            return h.dom.appendChildNodeIO(buttonElement, parentElement);
        }),


        //DONE
        createButtonRemoveAllDocsOfKind: my.curry(function (kind, db, parentElement) {
            let buttonElement;
            let elementInfo;

            elementInfo = new h.dom.ElementInfoConstructor();
            elementInfo.kind = 'button';

            elementInfo.attribute.push({
                key: 'kind',
                value: kind
            });

            elementInfo.event.push({
                key: 'click',
                value: h.event.deleteAllDocsWithFilter
            });

            buttonElement = h.dom.elementBuilder(elementInfo, db);
            h.dom.appendInnerHTMLIO('remove all ' + kind, buttonElement);
            return h.dom.appendChildNodeIO(buttonElement, parentElement);
        }),

        //NOT DONE
        createSelectAddSelectedNumberOfDocsOfKind: my.curry(function (kind, db, parentElement) {
            let selectElement;
            let elementInfo;
            let optionValues = [1, 2, 3, 4, 5];

            elementInfo = new h.dom.ElementInfoConstructor();
            elementInfo.kind = 'select';

            elementInfo.attribute.push({
                key: 'kind',
                value: kind
            });

            elementInfo.event.push({
                key: 'change',
                value: h.event.addSelectedNumberOfDocsWithFilter
            });

            selectElement = h.dom.elementBuilder(elementInfo, db);


            optionValues.forEach((optionValue) => {

                let elementInfo = new h.dom.ElementInfoConstructor();
                elementInfo.kind = 'option';

                elementInfo.attribute.push({
                    key: 'value',
                    value: optionValue
                });
                
                let optionElement = h.dom.elementBuilder(elementInfo, db);

                h.dom.appendInnerHTMLIO(optionValue, optionElement);
                h.dom.appendChildNodeIO(optionElement, selectElement);

            });

            h.dom.appendChildNodeIO(selectElement, parentElement);
        }),


        /**
         * Creates an input field
         * @param holderElement the element box
         * @param kind kind of user data (rent...)
         * @param db the database
         */
        createTextInput: my.curry(function (kind, db, holderElement) {
            let textInputElement;
            let elementInfo;

            elementInfo = new h.dom.ElementInfoConstructor();
            elementInfo.kind = 'input';

            elementInfo.attribute.push({
                key: 'kind',
                value: kind
            });
            elementInfo.attribute.push({
                key: 'id',
                value: 'inputSectionName'
            });
            elementInfo.event.push({
                key: 'click',
                value: h.event.detectClickFunction
            });
            elementInfo.event.push({
                key: 'keypress',
                value: h.event.detectKeybordFunction
            });
            elementInfo.event.push({
                key: 'blur',
                value: h.event.detectBlurFunction
            }); 

            textInputElement = h.dom.elementBuilder(elementInfo, db);
          
            return h.dom.appendChildNodeIO(textInputElement, holderElement);
        }),

        //DONE
        /**
         * Creates and orders buttons of specified types.
         * @param holderId the box for the buttons
         * @param kind kind of user data (rent...) Determents what to create
         * @param db the database
         */
        createButtonsRowOfKind: my.curry(function (holderId, kind, db, parentId) {
            let holderElement = h.dom.getElement('id', holderId);
            views.parmaco.createButtonAddOneDocOfKindFirst(kind, db, holderElement, parentId);
            views.parmaco.createButtonAddOneDocOfKindLast(kind, db, holderElement, parentId);
            views.parmaco.createButtonRemoveFirstDocOfKind(kind, db, holderElement, parentId);
            views.parmaco.createButtonRemoveLastDocOfKind(kind, db, holderElement, parentId);
            
            if(kind === 'section') {
                views.parmaco.createTextInput(kind, db, holderElement);
            }
            return holderElement;
        }),

        //NOT DONE
        /**
         * Takes content from database and places it in form elements
         * @param holderId the id of the parent
         * @param kind kind of user data (rent...)
         * @param db the database
         */
        //Parent is the row
        createElementsOfKind: my.curry(function (holderId, parentId, db, parentLevel) {
            let holderElement = h.dom.getElement('id', holderId);

            let kind = parentId;

            h.pouch.getAllRowsWithFilter(db, kind)
                .then((filteredRows) => {
                    if (!h.boolean.isEmpty(filteredRows)) {
                        let elements = filteredRows.map((filteredRow) => {
                            return views.parmaco.form(kind, db, filteredRow); //makes a form
                        });
                        elements.forEach((element) => {
                            h.dom.appendChildNodeIO(element, holderElement);
                        });
                    } else {
                        let elementInfo = new h.dom.ElementInfoConstructor();

                        elementInfo.kind = 'button';
                        elementInfo.attribute.push({
                            key: 'id',
                            value: parentId + '-' + parentLevel + '-aggregator'
                        });
            
                        let elementButton = h.dom.elementBuilder(elementInfo, db);
            
                        h.dom.appendInnerHTMLIO('testknapp', elementButton);
            
                        h.dom.appendChildNodeIO(elementButton, holderElement);
            
                        // let subscription = events.subscribe('changedValue', function(obj) {
                        //     console.log('working');
                        //     let shortObj = h.str.removeLastWordFromStringUsingSplitterAndKeepSplitters(obj, '-');
                        //     console.log(shortObj);
            
                        //     if (kind === shortObj) {
            
                        //         h.pouch.getAllRowsWithFilter(db, kind + '-element')
                        //         .then((filteredRows) => {
            
                        //             let elementValues = filteredRows.map((filteredRow) => {
                        //                 return filteredRow.doc.elementValue; //makes a form
                        //             });
            
            
                        //             let sum = elementValues.reduce((a, x) => a += h.str.convertStringToNumber(x), 0);
            
                        //             h.dom.appendInnerHTMLIO(sum, elementButton);
                                
            
                        //         });
                        //     }
                            
                        // });
            
                    }
                
                });
        }),


        /**
         * Creates DOM element of specified kind with info from row in db and places it first
         * @param holderId the id of the parent
         * @param kind kind of user data (rent...)
         * @param db the database
         * @param row db row
         */
        createElementOfKindFirst: my.curry(function (holderId, kind, db, row) {
            let holderElement = h.dom.getElement('id', holderId);
            let element = views.parmaco.form(kind, db, row);

            let subscription = events.subscribe('changedElementNumber', function(obj) {

                h.pouch.getDoc(row.doc._id, db)
                    .then((doc) => {
                        h.dom.appendInnerHTMLIO(doc.positionH, element.children[0].children[0].children[0]);
                    });
                
            });

            h.dom.appendChildNodeFirstIO(element, holderElement);
        }),

                /**
         * Creates DOM element of specified kind with info from row in db and places it first
         * @param holderId the id of the parent
         * @param kind kind of user data (rent...)
         * @param db the database
         * @param row db row
         */
        createCounterElements: my.curry(function (holderId, kind, db, order) {
            let holderElement = h.dom.getElement('id', holderId);
            let element = views.parmaco.counters(kind, db, kind);


            if (order === 'first') {
                h.dom.appendChildNodeFirstIO(element, holderElement);
            } else {
                h.dom.appendChildNodeIO(element, holderElement);
            }
            
        }),


        /**
         * Creates DOM element of specified kind with info from row in db and places it first
         * @param holderId the id of the parent
         * @param kind kind of user data (rent...)
         * @param db the database
         * @param row db row
         */
        createColumnAdderElement: my.curry(function (holderId, kind, db, order, doc, positionH) {
            let holderElement = h.dom.getElement('id', holderId);
            let element = views.parmaco.columnAdder(kind, db, kind);

            // events.subscribe('columnAddedToRow', function (obj) {
            //     //element.children[0].children[0] = obj;
            //     console.log('elementToChange');
            //     console.log(element.children[0].children[1].children[0].children[0]);
            //     h.dom.setAttribute('value', obj, element.children[0].children[1].children[0].children[0]);
            // });


            

            events.subscribe('changedValue', function (obj) {
                //element.children[0].children[0] = obj;
                console.log('changedValue');
                console.log(obj);
                console.log(doc.kind);

                if (h.str.removeLastWordsFromStringUsingSplitter(doc.kind, 2, '-') === obj.sectionName && positionH === obj.positionH) {
                    console.log(element.children[0].children[1].children[0].children[0]);
                    getAllDocsInColumn(obj.doc, db)
                        .then((allDocsInColumn) => {
                            console.log('allDocsInColumn');
                            console.log(allDocsInColumn);
                            let valuesOfAllDocsInColumn = allDocsInColumn.map((docInColumn) => {
                                return docInColumn.elementValue;
                            });

                            console.log('valuesOfAllDocsInColumn');
                            console.log(valuesOfAllDocsInColumn);

                            let sumOfColumnValues = valuesOfAllDocsInColumn.reduce((a, x) => {
                                let result = x === '' ? 0 : Number(x);
                                //let result = x;
                                return a += result;
                            }, 0);
                            console.log('sumOfColumnValues');
                            console.log(sumOfColumnValues);
                            h.dom.setAttribute('value', sumOfColumnValues, element.children[0].children[1].children[0].children[0]);
                            
                        }); 
                }
                
            });

            if (order === 'first') {
                h.dom.appendChildNodeFirstIO(element, holderElement);
            } else {
                h.dom.appendChildNodeIO(element, holderElement);
            }
            
        }),



                 
        /**
         * Creates DOM element of specified kind with info from row in db and places it first
         * @param holderId the id of the parent
         * @param kind kind of user data (rent...)
         * @param db the database
         * @param row db row
         */
        createElementOfKind: my.curry(function (holderId, kind, db, doc, order, controller, editable) {

            console.log('CREATING ELEMENT');
            let holderElement = h.dom.getElement('id', holderId);
            let element = views.parmaco.form(kind, db, doc, editable);


            let subscription = events.subscribe('changedCellValue', function(obj) {

                h.pouch.getDoc(doc._id, db)
                    .then((doc) => {
                        let respondingCellsPositionH = doc.positionH;
                        let respondingCellsPreviousH = doc.previousH;
                        let respontingCellsPositionV = doc.positionV;
                        let respondingCellsSectionName = h.str.removeLastWordsFromStringUsingSplitter(doc.kind, 2, '-');
                        let changedCellsPositionH = obj.positionH;
                        let changedCellsPositionV = obj.positionV;
                        let changedCellsSectionName = obj.sectionName;
                        let changedCellsDoc = obj.doc;

                        console.log(respondingCellsSectionName);


                        return h.pouch.getDoc(doc.parentId, db)
                            .then((parentDoc) => {
                                if (parentDoc.nextV === 'last') {
                                    if(doc.positionH === changedCellsPositionH) {
                                        // console.log('same positionH');
                                        // console.log(doc);
                                        if (changedCellsSectionName === respondingCellsSectionName) {
                                            console.log('same positionH AND same section');
                                            console.log(doc);
                                            
                                            return getAllDocsInColumn(changedCellsDoc, db, controller)
                                                .then((columnDocs) => {
                                                    console.log('All docs in column');
                                                    console.log(columnDocs);

                                                    let columnValues = columnDocs.map(columnDoc => {
                                                        return columnDoc.elementValue;    
                                                    });
                                                    console.log('columnValues');
                                                    console.log(columnValues);
             
                                                    let columnValuesAsNumbers = columnValues.map(columnValue => {
                                                        return Number(columnValue);    
                                                    });

                                                    console.log('columnValuesAsNumbers');
                                                    console.log(columnValuesAsNumbers);

                                                    let columnValuesAsNumbersWithNaNRemoved = columnValuesAsNumbers.filter(columnValueAsNumber => {
                                                        return h.boolean.isNumber(columnValueAsNumber);  
                                                    });

                                                    console.log('columnValuesAsNumbersWithNaNRemoved');
                                                    console.log(columnValuesAsNumbersWithNaNRemoved);


                                                    let accumulatedColumnValue = columnValuesAsNumbersWithNaNRemoved.reduce((accumulator, columnValueAsNumberWithNaNRemoved) => {
                                                        return accumulator += columnValueAsNumberWithNaNRemoved;
                                                    }, 0);
                                                    console.log('accumulatedColumnValue');
                                                    console.log(accumulatedColumnValue);
                                                    // h.dom.appendInnerHTMLIO(accumulatedColumnValue, element.children[0].children[0].children[0]);
                                                    h.dom.setAttribute('value', accumulatedColumnValue, element.children[0].children[1].children[0].children[0]);
                                                    let parameters = [
                                                        {
                                                            key: 'elementValue',
                                                            value: accumulatedColumnValue
                                                        }
                                                    ];
                                                    return h.pouch.editDocByIdAndPut(doc._id, db, parameters)
                                                        .then(() => {
                                                            events.publish('changedCellValue', {
                                                                value: accumulatedColumnValue,
                                                                sectionName: h.str.removeLastWordsFromStringUsingSplitter(doc.kind, 2, '-'),
                                                                positionH: doc.positionH,
                                                                positionV: doc.positionV,
                                                                doc: doc
                                                            });
                                                        });
                                                }); 
                                        }
                                    }
                                } 
                                
                                if (respontingCellsPositionV === changedCellsPositionV && respondingCellsSectionName === changedCellsSectionName) {
                                    console.log('LOOK AT DOC');
                                    console.log(doc);
                                    if (respondingCellsPositionH == '1') {
                                        console.log('I SHOULD RESPOND');
                                        console.log(doc);

                                        return getAllDocsInRow(changedCellsDoc, db, controller)
                                            .then((columnDocs) => {
                                                console.log('All docs in column');
                                                console.log(columnDocs);

                                                let columnValues = columnDocs.map(columnDoc => {
                                                    return columnDoc.elementValue;    
                                                });
                                                console.log('columnValues');
                                                console.log(columnValues);
        
                                                let columnValuesAsNumbers = columnValues.map(columnValue => {
                                                    return Number(columnValue);    
                                                });

                                                console.log('columnValuesAsNumbers');
                                                console.log(columnValuesAsNumbers);

                                                let columnValuesAsNumbersWithNaNRemoved = columnValuesAsNumbers.filter(columnValueAsNumber => {
                                                    return h.boolean.isNumber(columnValueAsNumber);  
                                                });

                                                console.log('columnValuesAsNumbersWithNaNRemoved');
                                                console.log(columnValuesAsNumbersWithNaNRemoved);


                                                let accumulatedColumnValue = columnValuesAsNumbersWithNaNRemoved.reduce((accumulator, columnValueAsNumberWithNaNRemoved) => {
                                                    return accumulator += columnValueAsNumberWithNaNRemoved;
                                                }, 0);
                                                console.log('accumulatedColumnValue');
                                                console.log(accumulatedColumnValue);
                                                // h.dom.appendInnerHTMLIO(accumulatedColumnValue, element.children[0].children[0].children[0]);
                                                h.dom.setAttribute('value', accumulatedColumnValue, element.children[0].children[1].children[0].children[0]);
                                                let parameters = [
                                                    {
                                                        key: 'elementValue',
                                                        value: accumulatedColumnValue
                                                    }
                                                ];
                                                return h.pouch.editDocByIdAndPut(doc._id, db, parameters);

                                                

                                                

                                            }); 

                                    }
                                }
                            });
                        
                    });     
            });

            if (order === 'first') {
                h.dom.appendChildNodeFirstIO(element, holderElement);
            } else {
                h.dom.appendChildNodeIO(element, holderElement);
            }
            
        }),


//BACKUP
        // /**
        //  * Creates DOM element of specified kind with info from row in db and places it first
        //  * @param holderId the id of the parent
        //  * @param kind kind of user data (rent...)
        //  * @param db the database
        //  * @param row db row
        //  */
        // createElementOfKind: my.curry(function (holderId, kind, db, doc, order, controller, editable) {
        //     let holderElement = h.dom.getElement('id', holderId);
        //     let element = views.parmaco.form(kind, db, doc, editable);

        //     // let subscription = events.subscribe('changedElementNumber', function(obj) {

        //     //     h.pouch.getDoc(doc._id, db)
        //     //         .then((doc) => {
        //     //             h.dom.appendInnerHTMLIO(doc.positionH, element.children[0].children[0].children[0]);
        //     //         });     
        //     // });

        //     // {
        //     //     value: elementValue,
        //     //     sectionName: h.str.removeLastWordsFromStringUsingSplitter(doc.kind, 2, '-'),
        //     //     positionH: doc.positionH,
        //     //     positionV: doc.positionV,
        //     //     doc: doc
        //     // }

        //     let subscription = events.subscribe('changedCellValue', function(obj) {

        //         h.pouch.getDoc(doc._id, db)
        //             .then((doc) => {
        //                 let respondingCellsPositionH = doc.positionH;
        //                 let respondingCellsPreviousH = doc.previousH;
        //                 let respontingCellsPositionV = doc.positionV;
        //                 let respondingCellsSectionName = h.str.removeLastWordsFromStringUsingSplitter(doc.kind, 2, '-');
        //                 let changedCellsPositionH = obj.positionH;
        //                 let changedCellsPositionV = obj.positionV;
        //                 let changedCellsSectionName = obj.sectionName;
        //                 let changedCellsDoc = obj.doc;

        //                 console.log(respondingCellsSectionName);


        //                 return h.pouch.getDoc(doc.parentId, db)
        //                     .then((parentDoc) => {
        //                         if (parentDoc.nextV === 'last') {
        //                             if(doc.positionH === changedCellsPositionH) {
        //                                 // console.log('same positionH');
        //                                 // console.log(doc);
        //                                 if (changedCellsSectionName === respondingCellsSectionName) {
        //                                     console.log('same positionH AND same section');
        //                                     console.log(doc);
                                            
        //                                     return getAllDocsInColumn(changedCellsDoc, db, controller)
        //                                         .then((columnDocs) => {
        //                                             console.log('All docs in column');
        //                                             console.log(columnDocs);

        //                                             let columnValues = columnDocs.map(columnDoc => {
        //                                                 return columnDoc.elementValue;    
        //                                             });
        //                                             console.log('columnValues');
        //                                             console.log(columnValues);
             
        //                                             let columnValuesAsNumbers = columnValues.map(columnValue => {
        //                                                 return Number(columnValue);    
        //                                             });

        //                                             console.log('columnValuesAsNumbers');
        //                                             console.log(columnValuesAsNumbers);

        //                                             let columnValuesAsNumbersWithNaNRemoved = columnValuesAsNumbers.filter(columnValueAsNumber => {
        //                                                 return h.boolean.isNumber(columnValueAsNumber);  
        //                                             });

        //                                             console.log('columnValuesAsNumbersWithNaNRemoved');
        //                                             console.log(columnValuesAsNumbersWithNaNRemoved);


        //                                             let accumulatedColumnValue = columnValuesAsNumbersWithNaNRemoved.reduce((accumulator, columnValueAsNumberWithNaNRemoved) => {
        //                                                 return accumulator += columnValueAsNumberWithNaNRemoved;
        //                                             }, 0);
        //                                             console.log('accumulatedColumnValue');
        //                                             console.log(accumulatedColumnValue);
        //                                             // h.dom.appendInnerHTMLIO(accumulatedColumnValue, element.children[0].children[0].children[0]);
        //                                             h.dom.setAttribute('value', accumulatedColumnValue, element.children[0].children[1].children[0].children[0]);
        //                                             let parameters = [
        //                                                 {
        //                                                     key: 'elementValue',
        //                                                     value: accumulatedColumnValue
        //                                                 }
        //                                             ];
        //                                             return h.pouch.editDocByIdAndPut(doc._id, db, parameters)
        //                                                 .then(() => {
        //                                                     events.publish('changedCellValue', {
        //                                                         value: accumulatedColumnValue,
        //                                                         sectionName: h.str.removeLastWordsFromStringUsingSplitter(doc.kind, 2, '-'),
        //                                                         positionH: doc.positionH,
        //                                                         positionV: doc.positionV,
        //                                                         doc: doc
        //                                                     });
        //                                                 });
        //                                         }); 
        //                                 }
        //                             }
        //                         } 
                                
        //                         if (respontingCellsPositionV === changedCellsPositionV && respondingCellsSectionName === changedCellsSectionName) {
        //                             console.log('LOOK AT DOC');
        //                             console.log(doc);
        //                             if (respondingCellsPositionH == '1') {
        //                                 console.log('I SHOULD RESPOND');
        //                                 console.log(doc);

        //                                 return getAllDocsInRow(changedCellsDoc, db, controller)
        //                                     .then((columnDocs) => {
        //                                         console.log('All docs in column');
        //                                         console.log(columnDocs);

        //                                         let columnValues = columnDocs.map(columnDoc => {
        //                                             return columnDoc.elementValue;    
        //                                         });
        //                                         console.log('columnValues');
        //                                         console.log(columnValues);
        
        //                                         let columnValuesAsNumbers = columnValues.map(columnValue => {
        //                                             return Number(columnValue);    
        //                                         });

        //                                         console.log('columnValuesAsNumbers');
        //                                         console.log(columnValuesAsNumbers);

        //                                         let columnValuesAsNumbersWithNaNRemoved = columnValuesAsNumbers.filter(columnValueAsNumber => {
        //                                             return h.boolean.isNumber(columnValueAsNumber);  
        //                                         });

        //                                         console.log('columnValuesAsNumbersWithNaNRemoved');
        //                                         console.log(columnValuesAsNumbersWithNaNRemoved);


        //                                         let accumulatedColumnValue = columnValuesAsNumbersWithNaNRemoved.reduce((accumulator, columnValueAsNumberWithNaNRemoved) => {
        //                                             return accumulator += columnValueAsNumberWithNaNRemoved;
        //                                         }, 0);
        //                                         console.log('accumulatedColumnValue');
        //                                         console.log(accumulatedColumnValue);
        //                                         // h.dom.appendInnerHTMLIO(accumulatedColumnValue, element.children[0].children[0].children[0]);
        //                                         h.dom.setAttribute('value', accumulatedColumnValue, element.children[0].children[1].children[0].children[0]);
        //                                         let parameters = [
        //                                             {
        //                                                 key: 'elementValue',
        //                                                 value: accumulatedColumnValue
        //                                             }
        //                                         ];
        //                                         return h.pouch.editDocByIdAndPut(doc._id, db, parameters);

                                                

                                                

        //                                     }); 

        //                             }
        //                         }
        //                     });
                        
        //             });     
        //     });

        //     if (order === 'first') {
        //         h.dom.appendChildNodeFirstIO(element, holderElement);
        //     } else {
        //         h.dom.appendChildNodeIO(element, holderElement);
        //     }
            
        // }),

        //         /**
        //  * Creates DOM element of specified kind with info from row in db and places it first
        //  * @param holderId the id of the parent
        //  * @param kind kind of user data (rent...)
        //  * @param db the database
        //  * @param row db row
        //  */
        // createElementOfKind: my.curry(function (holderId, kind, db, row, order) {
        //     let holderElement = h.dom.getElement('id', holderId);
        //     let element = views.parmaco.form(kind, db, row);

        //     let subscription = events.subscribe('changedElementNumber', function(obj) {

        //         h.pouch.getDoc(row.doc._id, db)
        //             .then((doc) => {
        //                 h.dom.appendInnerHTMLIO(doc.positionH, element.children[0].children[0].children[0]);
        //             });
                
        //     });

        //     if (order === 'first') {
        //         h.dom.appendChildNodeFirstIO(element, holderElement);
        //     } else {
        //         h.dom.appendChildNodeIO(element, holderElement);
        //     }
            
        // }),



        //DONE
        /**
         * Builds a DOM element for headline named from kind and places it in parent
         * @param holderId the id of the parent
         * @param kind kind of user data (rent...)
         * @param db the database
         */
        createChart: my.curry(function (holderId, doc, db, controller) {

            const chartModel = new ChartModel(doc, db, controller);
            const chartView = new ChartView(chartModel);
            const chartCtrl = new ChartCtrl(chartView, chartModel);

            let holderElement = h.dom.getElement('id', holderId);

            h.dom.appendChildNodeIO(chartView.getDOM().chartElement, holderElement);

            chartView.notify();
        }),


        //DONE
        /**
         * Builds a DOM element for headline named from kind and places it in parent
         * @param holderId the id of the parent
         * @param kind kind of user data (rent...)
         * @param db the database
         */
        createHeadlineOfKind: my.curry(function (holderId, level, db, doc) {

            const headlineModel = new HeadlineModel(doc._id, db);
            const headlineView = new HeadlineView(headlineModel);
            const headlineCtrl = new HeadlineCtrl(headlineView, headlineModel);

            let holderElement = h.dom.getElement('id', holderId);

            h.dom.appendChildNodeIO(headlineView.getDOM().element, holderElement);

            headlineModel.newData();
        }),

        //DONE
        /**
         * Creates an empty div for element with id and places it to the parent
         * @param holderId the id of the parent
         * @param kind kind of user data (rent...)
         * @param db the database
         */
        createBoxForElementsOfKind: my.curry(function (holderId, docId, db, level) {
            let elementInfo = new h.dom.ElementInfoConstructor();

            elementInfo.kind = 'div';
            elementInfo.attribute.push({
                key: 'class',
                value: 'forms-and-chart-box'
            });
            elementInfo.attribute.push({
                key: 'id',
                value: docId + '-' + level + '-elements-box'
            });

            let elementDiv = h.dom.elementBuilder(elementInfo, db);

            let holderElement = h.dom.getElement('id', holderId);
            h.dom.appendChildNodeIO(elementDiv, holderElement);
        }),

        //DONE
        /**
         * Creates an empty div for section with id and places it to the parent
         * @param holderId the id of the parent
         * @param kind kind of user data (rent...)
         * @param db the database
         */
        createBoxForSection: my.curry(function (holderId, db, partId, order) {

            let sectionParmacoElement = document.createElement('div', 'section-parmaco');
            sectionParmacoElement.setId(partId + '-section-box');
            
            let holderElement = h.dom.getElement('id', holderId);

            if (order === 'first') {
                h.dom.appendChildNodeFirstIO(sectionParmacoElement, holderElement);
            } else {
                h.dom.appendChildNodeIO(sectionParmacoElement, holderElement);
            }
        }),


        createBoxForRow: my.curry(function (holderId, db, partId, order) {
            let elementInfo = new h.dom.ElementInfoConstructor();

            elementInfo.kind = 'div';
            elementInfo.attribute.push({
                key: 'id',
                value: partId + '-row-box'
            });

            elementInfo.attribute.push({
                key: 'kind',
                value: 'row-box'
            });

            elementInfo.attribute.push({
                key: 'parentId',
                value: holderId
            });

            let elementDiv = h.dom.elementBuilder(elementInfo, db);

            let holderElement = h.dom.getElement('id', holderId);

            if (order === 'first') {
                h.dom.appendChildNodeAtPositionIO(2, elementDiv, holderElement);
            } else {
                h.dom.appendChildNodeIO(elementDiv, holderElement);
            }

            
        }),




        //DONE
        /**
         * Creates an empty div for headline with id and places it to the parent
         * @param holderId the id of the parent
         * @param kind kind of user data (rent...)
         * @param db the database
         */
        createBoxForHeadline: my.curry(function (holderId, docId, db, level) {
            let elementInfo = new h.dom.ElementInfoConstructor();

            elementInfo.kind = 'div';
            elementInfo.attribute.push({
                key: 'class',
                value: 'heading-box'
            });

            elementInfo.attribute.push({
                key: 'id',
                value: docId + '-' + level + '-headline-box'
            });

            

            let elementDiv = h.dom.elementBuilder(elementInfo, db);

            let holderElement = h.dom.getElement('id', holderId);
            h.dom.appendChildNodeIO(elementDiv, holderElement);
        }),


                //DONE
        /**
         * Creates an empty div for headline with id and places it to the parent
         * @param holderId the id of the parent
         * @param kind kind of user data (rent...)
         * @param db the database
         */
        createBoxForChart: my.curry(function (holderId, docId, db, level) {
            let elementInfo = new h.dom.ElementInfoConstructor();

            elementInfo.kind = 'div';
            // elementInfo.attribute.push({
            //     key: 'class',
            //     value: 'heading-box'
            // });

            console.log(docId + '-' + level + '-chart-box');

            elementInfo.attribute.push({
                key: 'id',
                value: docId + '-' + level + '-chart-box'
            });

            let elementDiv = h.dom.elementBuilder(elementInfo, db);

            let holderElement = h.dom.getElement('id', holderId);
            h.dom.appendChildNodeIO(elementDiv, holderElement);
        }),

        createBoxForButtonsRowFirst: my.curry(function (holderId, kind, db) {
            let elementInfo = new h.dom.ElementInfoConstructor();

            elementInfo.kind = 'div';
            elementInfo.attribute.push({
                key: 'class',
                value: 'heading-box'
            });

            elementInfo.attribute.push({
                key: 'id',
                value: kind + '-section-buttonsrow-box'
            });

            let elementDiv = h.dom.elementBuilder(elementInfo, db);

            let holderElement = h.dom.getElement('id', holderId);
            
            h.dom.appendChildNodeFirstIO(elementDiv, holderElement);
        }),

        //DONE
        /**
         * Creates an empty div for button with id and places it to the parent
         * @param holderId the id of the parent
         * @param kind kind of user data (rent...)
         * @param db the database
         */
        createBoxForButtonsRow: my.curry(function (holderId, db, order, docId, level) {
            let elementInfo = new h.dom.ElementInfoConstructor();

            elementInfo.kind = 'div';
            elementInfo.attribute.push({
                key: 'class',
                value: 'heading-box'
            });

            elementInfo.attribute.push({
                key: 'id',
                value: docId + '-' + level + '-buttonsrow-box'
            });

            let elementDiv = h.dom.elementBuilder(elementInfo, db);

            let holderElement = h.dom.getElement('id', holderId);

            if (order === 'first') {
                h.dom.appendChildNodeFirstIO(elementDiv, holderElement);
            } else {
                h.dom.appendChildNodeIO(elementDiv, holderElement);
            }   
        }),

        //DONE
        /**
         * Creates a section constrained to a cost type containing heading and rows
         * @param kind type of user data (rent...)
         * @param db the database
         */

        createSection: my.curry(function (sectionName, db, order, docId, doc, controller) {
            
            let sectionParmacoElement = document.createElement('div', 'section-parmaco');
            sectionParmacoElement.setId(docId + '-section-box');
            sectionParmacoElement.newHeadline(doc._id, db);
            sectionParmacoElement.newHeadline(doc._id, db);
            //sectionParmacoElement.hoot();
            //h.dom.appendInnerHTMLIO('BETWEEN H1', sectionParmacoElement)
            sectionParmacoElement.newChart(doc, db, controller);


            
            // views.parmaco.createBoxForHeadline(docId + '-section-box', docId, db, 'section');
            // views.parmaco.createBoxForButtonsRow(docId + '-section-box', db, 'last', docId, 'section');           
            // views.parmaco.createBoxForChart(docId + '-section-box', docId, db, 'section');



            // let holderElement = h.dom.getElement('id', holderId);

            

            // headlineModel.newData();

            // views.parmaco.createButtonsRowOfKind(docId + '-section-buttonsrow-box', sectionName + '-row', db, docId);
            
            // //MVC
            // views.parmaco.createHeadlineOfKind(docId + '-section-headline-box', 'section', db, doc);
            // //MVC
            // views.parmaco.createChart(docId + '-section-chart-box', doc, db, controller);

            
            
            let holderElement = h.dom.getElement('id', 'main');

            if (order === 'first') {
                h.dom.appendChildNodeFirstIO(sectionParmacoElement, holderElement);
            } else {
                h.dom.appendChildNodeIO(sectionParmacoElement, holderElement);
            }

        }),

        createRow: my.curry(function (kind, db, order, docId, doc) {
            views.parmaco.createBoxForRow(doc.parentId + '-section-box', db, docId, order);
            views.parmaco.createBoxForHeadline(docId + '-row-box', docId, db, 'row');
            views.parmaco.createHeadlineOfKind(docId + '-row-headline-box', 'row', db, doc);
            views.parmaco.createBoxForButtonsRow(docId + '-row-box', db, 'last', docId, 'row');
            views.parmaco.createButtonsRowOfKind(docId + '-row-buttonsrow-box', kind  + '-row-element', db, docId);
            views.parmaco.createBoxForElementsOfKind(docId + '-row-box', docId, db, 'row');
            //views.parmaco.createElementsOfKind(docId + '-row-elements-box', docId, db, 'row');
        })
    };

}).apply(views);




//DONE
/**
 * Creates DOM element of specified kind with info from row in db and places it last
 * @param holderId the id of the parent
 * @param kind kind of user data (rent...)
 * @param db the database
 * @param row db row
 */
// createElementOfKindLast: my.curry(function (holderId, kind, db, row) {
//     console.log('My holder ID');
//     console.log(holderId);
//     let holderElement = h.dom.getElement('id', holderId);
//     let element = views.parmaco.form(kind, db, row);

//     h.dom.appendChildNodeIO(element, holderElement);
    
// }),