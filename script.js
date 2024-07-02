let section = document.querySelector("section");

//針對按鈕做設定，回到只有按鈕的功能 沒有表單的功能(按出按鍵送出資料)
let add = document.querySelector("form button");
add.addEventListener("click", e => {
    e.preventDefault();

    let form = e.target.parentElement;
    let todoText = form.children[0].value;
    let todoYear = form.children[1].value;
    let todoMonth = form.children[2].value;
    let todoDate = form.children[3].value;

    // console.log(todoText, todoYear, todoMonth, todoDate);

    if (todoText === "" || todoYear === "" || todoMonth === "" || todoDate === "") {
        alert("請輸入完整資訊");
        return; //return: 不執行的意思


    } else {
        if (todoYear < 2024 || todoYear > 2025) {
            alert("請輸入2024~2025之間的數字");
            return;
        } else if (todoMonth < 1 || todoMonth > 12) {
            alert("請輸入1~12之間的數字");
            return;
        } else if (todoDate < 1 || todoDate > 32) {
            alert("請輸入1~31之間的數字");
            return;
        }
        // 哪裡錯了
        // }else{
        //     if(todoYear >= 2024 && todoYear <= 2025){
        //         alert("請輸入2024~2025之間的數字");
        //         return;
        //     }else if(todoMonth >= 1 && todoMonth <= 12){
        //         alert("請輸入1~12之間的數字");
        //         return;
        //     }
    }


    let todo = document.createElement("div");
    todo.classList.add("todo");

    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = todoText; //增加值

    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = todoYear + "/" + todoMonth + "/" + todoDate;

    todo.appendChild(text); //放在子元素裡面
    todo.appendChild(time);

    let compeleteButton = document.createElement("button");
    compeleteButton.classList.add("complete");
    compeleteButton.innerHTML = '<i class="fa-solid fa-check-to-slot"></i>';

    // 做刪除線 事件
    compeleteButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        console.log(todoItem)
        //add 改成 toggle，方可讓誤點的東西恢復
        todoItem.classList.toggle("done");
    });

    let trashButton = document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    trashButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        //動畫結束後再執行移除
        todoItem.addEventListener("animationend", () => {

            // 刪除時也要刪除localStorage的值
            // let text = todoItem.children[0].innerText; 以text值作為基礎去刪資料
            let id = todoItem.dataset.id;
            let myListArray = JSON.parse(localStorage.getItem("list"));
            myListArray = myListArray.filter(item => item.id !== id);
            localStorage.setItem("list", JSON.stringify(myListArray));
            // myListArray.forEach((item, index) => {
            //     if (item.todoText == text) {
            //         myListArray.splice(index, 1);
            //         localStorage.setItem("list", JSON.stringify(myListArray));
            //     }
            // });


            // Q: 刪除時如果名稱一樣，系統會隨機亂刪，如何解？

            todoItem.remove();
        })

        todoItem.style.animation = "scaleDown 0.5s forwards";
    });

    todo.appendChild(compeleteButton);
    todo.appendChild(trashButton);

    todo.style.animation = "scaleUp 0.5s forwards" // forwards:結束之後停在影格上面

    //創刪除鍵方便使用的ID。Date.now()，會回傳一組時間戳記 (timestamp)，所謂的時間戳記是從標準時間 1970 年 1 月 1 日開始累積的毫秒數Date()，轉換成人類看得懂的格式

    let todoId = Date.now().toString();

    //把四個物件變成一個值
    let myTodo = {
        id: todoId,
        todoText: todoText,
        todoYear: todoYear,
        todoMonth: todoMonth,
        todoDate: todoDate,
    };

    let myList = localStorage.getItem("list");
    if (myList == null) {

        // myTodoStr == JSON.stringify([myTodo]); //經過語法轉成字串
        // localStorage.setItem("list", myTodoStr);
        localStorage.setItem("list", JSON.stringify([myTodo]));
    } else {
        let myListArray = JSON.parse(myList); //轉成陣列
        myListArray.push(myTodo); //最後一筆的陣列值
        localStorage.setItem("list", JSON.stringify(myListArray)); //不用加中括號 已經是陣列
    }
    console.log(JSON.parse(localStorage.getItem("list")));

    form.children[0].value = ""; //把輸入時的第一格清掉
    form.children[1].value = "";
    form.children[2].value = "";
    form.children[3].value = "";

    todo.dataset.id = todoId;
    section.appendChild(todo); //跑出來的最後一件事情 = 結束
});

function loadData() {
    let myList = localStorage.getItem("list");
    if (myList !== null) {
        let myListArray = JSON.parse(myList);
        myListArray.forEach(item => {

            let todo = document.createElement("div");
            todo.classList.add("todo");
            todo.dataset.id = item.id;
            let text = document.createElement("p");
            text.classList.add("todo-text");
            text.innerText = item.todoText; //增加值    item從上面來的
            let time = document.createElement("p");
            time.classList.add("todo-time");
            time.innerText = item.todoYear + "/" + item.todoMonth + "/" + item.todoDate;

            todo.appendChild(text); //放在子元素裡面
            todo.appendChild(time);

            let compeleteButton = document.createElement("button");
            compeleteButton.classList.add("complete");
            compeleteButton.innerHTML = '<i class="fa-solid fa-check-to-slot"></i>';

            // 做刪除線 事件
            compeleteButton.addEventListener("click", e => {
                let todoItem = e.target.parentElement;
                console.log(todoItem)
                //add 改成 toggle，方可讓誤點的東西恢復
                todoItem.classList.toggle("done");
            });

            let trashButton = document.createElement("button");
            trashButton.classList.add("trash");
            trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

            trashButton.addEventListener("click", e => {
                let todoItem = e.target.parentElement;
                //動畫結束後再執行移除
                todoItem.addEventListener("animationend", () => {
                    let id = todoItem.dataset.id;
                    // 刪除時也要刪除localStorage的值
                    let text = todoItem.children[0].innerText;
                    let myListArray = JSON.parse(localStorage.getItem("list"));
                    myListArray = myListArray.filter(item => item.id !== id);
                    localStorage.setItem("list", JSON.stringify(myListArray));

                        // myListArray.forEach((item, index) => {
                        //     if (item.todoText == text) {
                        //         myListArray.splice(index, 1);
                        //         localStorage.setItem("list", JSON.stringify(myListArray));
                        //     }
                        // });

                        todoItem.remove();
                    });

                    todoItem.style.animation = "scaleDown 0.3s forwards";
                });

                todo.appendChild(compeleteButton);
                todo.appendChild(trashButton);

                todo.style.animation = "scaleUp 0.3s forwards" // forwards:結束之後停在影格上面


                section.appendChild(todo);
            });
        }
}


//在頁面裡面出現localstorage資料
window.addEventListener("load", loadData);


    //儲存排序後的結果 兩個兩個比
    function mergeTime(arr1, arr2) {
        let result = [];
        let i = 0; j = 0;
        while (i < arr1.length && j < arr2.length) {
            if (Number(arr1[i].todoYear) > Number(arr2[j].todoYear)) { //localStorage存的是字串所以得轉換
                result.push(arr2[j]); //push將數值放在最末端
                j++;
            } else if (Number(arr1[i].todoYear) < Number(arr2[j].todoYear)) {
                result.push(arr1[i]);
                i++;
            } else if (Number(arr1[i].todoYear) == Number(arr2[j].todoYear)) {
                if (Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)) {
                    result.push(arr2[j]);
                    j++;
                } else if (Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)) {
                    result.push(arr1[i]);
                    i++;
                } else if (Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)) {
                    if (Number(arr1[i].todoDate) > Number(arr2[j].todoDate)) {
                        result.push(arr2[j]);
                        j++;
                    } else {
                        result.push(arr1[i]);
                        i++;
                    }
                }
            }
        }
        while (i < arr1.length) {
            result.push(arr1[i]);
            i++;
        }
        while (j < arr2.length) {
            result.push(arr2[j]);
            j++;
        }
        return result;
    };

    // 建立比較函式
    function mergeSort(arr) {
        if (arr.length === 1) {
            return arr;
        } else {
            let middle = Math.floor(arr.length / 2);
            let left = arr.slice(0, middle); //slice:0~middle middle沒有包含
            let right = arr.slice(middle, arr.length);
            return (mergeTime(mergeSort(left), mergeSort(right))); //這段會一直做 做到剩下1為止
        }
    };

    let sortButton = document.querySelector("div.sort button");
    sortButton.addEventListener("click", () => {
        let sortedArray = mergeSort(JSON.parse(localStorage.getItem("list")));
        localStorage.setItem("list", JSON.stringify(sortedArray));

        //清空資料
        let len = section.children.length;
        for (let i = 0; i < len; i++) {
            section.children[0].remove();
        }

        loadData();
    });

    let clearButton = document.querySelector("div.clear button");
    clearButton.addEventListener("click", () => {
        let len = section.children.length;
        for (let i = 0; i < len; i++) {
            section.children[0].remove();
        }

        localStorage.clear();
        loadData();
    });