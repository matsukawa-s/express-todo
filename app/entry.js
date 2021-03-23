"use strict";
import $ from "jquery";
const global = Function("return this;")();
global.jQuery = $;
import bootstrap from "bootstrap";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";

// // 閏年判定関数
// const isLeapYear = (year) =>
//   (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

(function ($) {
  $("#task_delete_form").submit(function () {
    return confirm("本当に削除してよろしいですか？");
  });
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   const month = today.getMonth();
  //   const datesOfFebruary = isLeapYear(year) ? 29 : 28;

  //   const datesOfYear = [
  //     31,
  //     datesOfFebruary,
  //     31,
  //     30,
  //     31,
  //     30,
  //     31,
  //     31,
  //     30,
  //     31,
  //     30,
  //     31,
  //   ];

  //   // 年の初期値設定
  //   let optionYear = '<option selected="selected">----</option>\n';
  //   for (let i = year; i < year + 5; i++) {
  //     optionYear += '<option value="' + i + '">' + i + "</option>\n";
  //   }
  //   $("#year").html(optionYear);

  //   // 日の初期値設定
  //   let optionMonth = '<option selected="selected">----</option>\n';

  //   //
  //   function formSetDay() {
  //     var lastday = formSetLastDay($("#year").val(), $("#month").val());
  //     var option = "";
  //     for (var i = 1; i <= lastday; i++) {
  //       if (i === $(".js-changeDay").val()) {
  //         option +=
  //           '<option value="' + i + '" selected="selected">' + i + "</option>\n";
  //       } else {
  //         option += '<option value="' + i + '">' + i + "</option>\n";
  //       }
  //     }
  //     $(".js-changeDay").html(option);
  //   }

  //   function formSetLastDay(year, month){
  //     let lastday = new Array('', 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
  //     if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0){
  //       lastday[2] = 29;
  //     }
  //     return lastday[month];
  //   }

  //   // 年または月が変更されたら、日を更新する
  //   $("#year, #month").change(function () {
  //     // formSetDay();
  //     console.log("#year or #month change");
  //   });
})(jQuery);
