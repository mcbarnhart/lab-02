'use strict';

const keywords = [];
const allHorns = [];
let templateId = '#photo-template';

console.log('ready to rock');

function Horn(horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;

  // for (let key in horn) {
  //   this[key] = horn[key];
  // }
}

// Horn.prototype.render = function (container) {
//   let $container = $(container);
//   let $template = $('#photo-template');
//   let $horn = $template.clone();
//   $horn.removeAttr('id');
//   $horn.addClass('myHorns');
//   $horn.find('.horn-title').text(this.title);
//   $horn.find('.horn-img').attr('src', this.image_url);
//   $horn.find('.horn-description').text(this.description);
//   $container.append($horn);
//   dropDownRender(this);
// };

Horn.prototype.toHtml = function () {
  let template = $(templateId).html();
  let html = Mustache.render(template, this);
  console.log(this);
  dropDownRender(this);
  return html;
}

function dropDownRender(object) {
  let $select = $('.dropDown');
  let $optionTemp = $('.optionTemplate');
  let $option = $optionTemp.clone();
  $option.removeClass('optionTemplate');
  $option.text(object.keyword);


  if (keywords.every(function (element) {  //if (!keywords.includes(image.keyword))
    return element !== object.keyword;
  }))
  {keywords.push(object.keyword);
    $select.append($option);
  }

  /*------------------------------------------------------
   $createOptions.val(image.keyword)
  -----------------------------------------------------*/ 

}
$(document).ready(function () {
  $('.dropDown').change(function () {
    let selectedKeyword = $(this).children('option:selected').text();
    console.log(selectedKeyword);
    let $oldHorns = $('.myHorns');
    $oldHorns.remove();
    allHorns.forEach(element => {
      if (element.keyword === selectedKeyword) {
        $('main').append(element.toHtml());
      }
    });


  });
});


const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};

console.log('about to AJAX', ajaxSettings);

$.ajax('data/page-1.json', ajaxSettings)
  .then(function (data) {

    data.forEach(horn => {
      let actualHorn = new Horn(horn);
      //actualHorn.addClass('myHorns');
      allHorns.push(actualHorn);
    });
    console.log(allHorns);

    allHorns.forEach(ourNewHorns => {
      let aNewHorn = ourNewHorns.toHtml();
      $(aNewHorn).addClass('myHorns');
      $('main').append(aNewHorn);
    });

  });


