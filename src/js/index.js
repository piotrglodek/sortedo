const app = {
 getElement: function(classname) {
  if (typeof classname === 'string') {
   const elem = document.querySelector(classname);
   return elem;
  } else {
   console.error('Argument must by string');
  }
 },
 products: data,
 handleSelect: function() {
  const select = this.getElement('.select');
  this.handleSort(select[select.selectedIndex].value);
 },
 handleSort: function(selectedOption) {
  if (selectedOption === 'az') {
   const newData = this.products.sort((a, b) => (a.title > b.title ? 1 : -1));
   this.products = newData;
  } else if (selectedOption === 'za') {
   const newData = this.products.sort((a, b) => (a.title < b.title ? 1 : -1));
   this.products = newData;
  }
  this.render();
 },
 createTag: function(tagName, tagClass, tagText) {
  // arg1: html tag name e.g p, ul,li, arg2: classname of tag you can leave empty, arg3: text of tag also you can leave empty
  const tag = document.createElement(tagName);
  tag.classList.add(tagClass);
  tag.textContent = tagText;
  return tag;
 },
 appendChildrens: function(parentTag, childrens) {
  // arg1: createdTag arg2: array of childrens(createdTags) to append
  for (let i = 0; i < childrens.length; i++) {
   parentTag.appendChild(childrens[i]);
  }
  return parentTag;
 },
 render: function() {
  this.getElement('.products').innerHTML = '';
  const fragment = document.createDocumentFragment();
  this.products.forEach((product, index) => {
   const div = this.createTag('div', 'product');
   const divContainer = this.createTag('div', 'product__container');
   const h2 = this.createTag('h2', 'product__title', `${product.title}`);
   const emoji = this.createTag('span', 'product__emoji', `${product.emoji}`);
   const counter = this.createTag('div', 'product__index', `${index + 1}`);
   this.appendChildrens(divContainer, [h2, emoji, counter]);
   div.appendChild(divContainer);
   fragment.appendChild(div);
  });
  this.getElement('.products').appendChild(fragment);
  console.log(`Porducts has been rendered`);
 },
 bindEvents: function() {
  this.getElement('.select').addEventListener(
   'change',
   this.handleSelect.bind(this)
  );

  document
   .querySelectorAll('.filter__radio')
   .forEach(radio => radio.addEventListener('click', this.filter.bind(this)));
  console.log(`Event has been binded`);
 },
 filterOption: '',
 filter: function(e) {
  if (e.target.checked && e.target.value !== 'all') {
   const newData = this.products.filter(product => {
    return product.type === e.target.value;
   });
   this.products = newData;
   this.render();
   this.updateData();
  } else {
   this.render();
  }
 },
 updateData: function() {
  this.products = data;
 },
 init: function() {
  this.bindEvents();
  this.render();
 }
};

app.init();
