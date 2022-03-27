/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        const div = document.createElement(tag);
        div.innerHTML = content;
        document.body.appendChild(div);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    function recursion(level, count) {
        let n = count - 1;
        let parent;
        if (level > 0) {
            if (document.getElementsByClassName('item_' + n).length == 0) {
                parent = document.createElement('div');
                document.body.appendChild(parent);
                parent.setAttribute('class', 'item_' + count);
                recursion(level - 1, count + 1);
            } else {
                for (parent of document.getElementsByClassName('item_' + n)) {
                    for (let i = 0; i < childrenCount; i++) {
                        let node = document.createElement('div');
                        node.setAttribute('class', 'item_' + count);
                        parent.appendChild(node);
                    }
                }
                recursion(level - 1, count + 1);
                return parent;
            }
        }
        return parent;
    }
    return recursion(level, 1);
}
/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    let tree = generateTree(2, 3);
    let parent = document.getElementsByClassName('item_1')[0];
    for (let node of document.getElementsByClassName('item_2')) {
        if (node.tagName != 'SECTION') {
            let newNode = document.createElement('SECTION');
            newNode.setAttribute('class', 'item_2');
            for (let i = 0; i < 2; i++) {
                let child = node.firstChild;
                newNode.appendChild(child);
            }
            parent.appendChild(newNode);
        }
    }
    for (let i = 0; i < 2; i++) {
        let deleteNode = document.getElementsByClassName('item_2')[0];
        parent.removeChild(deleteNode);
    }
    console.log(tree.outerHTML);
    return tree;
}
