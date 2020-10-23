let otvoreny;
let bezovyPanel;
let navbar;
let slideIndex;
let slides;
let dots;
let jazyk;
let mobilos;

//roztvori tablicku daneho luda
function ujebTomu(x) {
  //ulozi id tuknuteho luda
  let pes = document.getElementById(x);

  //ak uz nie je otvoreny nejaky iny zamestnanec
  if (otvoreny == "nikto") {
    //ulozi aktualne otvoreneho luda
    otvoreny = pes;
    x = '#' + x;

    //zmaze css pre zatvorenu tablicku - ci uz pc alebo mobil
    $(x).removeClass("mobileLudo");
    $(x).removeClass("normLudo");

    //prida css pre otvorenu tablicku
    if ($(window).width() < 1000) {
      //pre mobil otvori "fullscreen" zobrazenie luda
      $('body div').hide();
      //vypne moznost kliknut na logo v mavbare kym je otvoreny nejaky ludo
      $('.mavbar a').attr("onclick", "");

      let picus = "#BL" + pes.id;
      $(picus).show();
      $(picus).find("div").show();
      $('.mavbar').show();
      $('.mavbar #menuButton').hide();
    } else {
      //pre pc
      $(x).addClass("bigLudo");
      $(x).find('.dlhyOpis').show();
    }

    //ukaze kontakt danej osoby
    $(x).find(".bengoroKontakt").show();
    //ukaze tlacitka pre email a zatvorenie tablicky
    $(x).find(".miniButtony").show();
    //ukaze zvysok opisneho textu
    $(x).find(".quiestce").find("span").removeClass("hidden");
  } else {
    //ak uz bol nejaky ludo otvoreny v momente kliknutia tak ho zavre
    //a otvori aktualne tuknuteho luda
    odjebTomu(otvoreny.id);
    ujebTomu(pes.id);
    otvoreny = pes
  }

  //riesi marginy medzi ludo divmi - obdlzniky nalavo maju mat margin right
  if ($(x).hasClass("lavo")) {
    $('.lavo').each(function() {
      if ($(this).index() > $(x).index() &&
          $(this).parent().attr("id") == $(x).parent().attr("id")) {
        $(this).removeClass("medzeraNapravo");
      }
    })

    $('.pravo').each(function() {
      if ($(this).index() > $(x).index() &&
          $(this).parent().attr("id") == $(x).parent().attr("id")) {
        $(this).addClass('medzeraNapravo');
      }
    })
  }
}

//funkcia na zatvorenie mobil big ludo screenu
function picusek(x) {
  let y = "#BL" + x;
  x = '#' + x;

  //rucne pohideuje resp poshowuje potrebne kokotiny pretoze na zobrazenie
  //mobil big luda sme hideovali divy v celom dokumente skurvenom

  //aka totalna sracka ale funguje to

  $("body div").show();
  $(".mobigLudo").hide();

  $(".ludo").addClass("mobileLudo");
  $(".bengoroKontakt").hide();
  $(".miniButtony").hide();

  $("#triangel").hide();
  $("#triangel2").hide();
  $('.navbar').hide();
  $('.pcJazyky').hide();
  $('.logo').hide();
  $('.bezovyPanel').hide();
  $('.popis').hide();
  $('.mavbar #menuButton').show();
  $('.dlhyOpis').hide();

  $('.pravo').removeClass("medzeraNapravo");
  $('.lavo').addClass("medzeraNapravo");

  //vrati logu v mavbare kliknutelnost
  $('.mavbar a').attr("onclick", "scrollni('#page1')");

  slide(0);

  $(window).scrollTop( $('#page3').offset().top);

  otvoreny = 'nikto';
}

//revertne zmeny sposobene ujebanim tomu
function odjebTomu(x) {
  //id osoby + zapamata si, ze ziadna tablicka uz nie je otvorena
  x = "#" + x;
  otvoreny = "nikto";

  //zmaze css pre roztvorenu tablicku
  $(x).removeClass("bigLudo");
  $(x).removeClass("mobigLudo");

  //prida css pre zatvorenu tablicku, podla toho ci pc alebo mobil
  if ($(window).width() < 1000) {
    $(x).addClass("mobileLudo");
  } else {
    $(x).addClass("normLudo");
    $(x).find('.dlhyOpis').hide();
  }

  //zmaze kontakt osoby, male tlacitka a zvysok opisneho textu
  $(x).find(".bengoroKontakt").hide();
  $(x).find(".miniButtony").hide();
  $(x).find(".quiestce").find(".dlhyOpis").addClass("hidden");

  $(".pravo").removeClass("medzeraNapravo");
  $('.lavo').addClass("medzeraNapravo");
}

//rozhoduje o tom co sa zobrazuje a co nie podla rozlisenia obrazovky
//kedze skurvene media query nefunguje dostatocne tak jak by sme chceli
function responzivum(q) {
  if (q.matches) {
    mobilos = true;

    console.log("menej");
    $(".ludo").removeClass("normLudo");
    $(".ludo").addClass("mobileLudo");
    $('.mavbar').show();
    $('.navbar').hide();
    $('.pcJazyky').hide();
    $('.logo').hide();
    $('.popis').hide();
    $('.bezovyPanel').hide();

    if (otvoreny != "nikto") {
      $('.bigLudo').removeClass('bigLudo');
    }
  } else {
    mobilos = false;

    console.log("viac");
    $(".ludo").removeClass("mobileLudo");
    $(".ludo").addClass("normLudo");
    $("#triangel").show();
    $("#triangel2").show();
    $('.mavbar').hide();
    $('.navbar').show();
    $('.pcJazyky').show();
    $('.popis').show();
    $('.bezovyPanel').show();
    $('.logo').show();

    //korekcia ked sa pri otvorenom ludovi zmeni z mob verzie na pc verziu
    //aka totalna kokotina
    if (otvoreny != "nikto") {
      picusek(otvoreny);
      $('.mobileLudo').removeClass("mobileLudo");
      $('.popis').show();
      $('.mavbar').hide();
      $('.navbar').show();
      $('.bezovyPanel').show();
      $('.logo').show();
      $('.pcJazyky').show();
    }
  }
}

//otvori mobilne menu
function otvorOverlay() {
  $("body").css("overflow-y", "hidden");
  document.getElementById("picaOverlay").style.width = "100vw";
  document.getElementById("picaOverlay").style.display = "flex";
  document.getElementById("picaOverlayLinks").style.display = "block";
  document.getElementById("mobilJazyky").style.display = "flex";
  document.getElementById("menuButton").style.display = "none";
  document.getElementById("closeButton").style.display = "block";

}
//zavre mobilne menu
function zatvorOverlay () {
  document.getElementById("picaOverlay").style.width = "0vw";
  document.getElementById("menuButton").style.display = "block";
  document.getElementById("closeButton").style.display = "none";
  document.getElementById("mobilJazyky").style.display = "none";
  $("body").css("overflow-y", "scroll");
}

//sleduje scrollovanie na stranke a podla toho zobrazuje resp schovava
//bezovy panel
window.addEventListener("scroll", function() {
  let scroll = window.scrollY;

  if (scroll > 50) {
    bezovyPanel.style.top = "0%";
    $('.navbar').css("background", 'none');
  }

  if (scroll < 50) {
    bezovyPanel.style.top = "-15%";
    $('.navbar').css("background", 'white');
  }
});

//slideuje medzi oblastami prava
function slide(n) {
  $('.oblastPrava').hide();
  slides[n].style.display = 'block';
}

//smooth scroll pre navbar linky v pc verzii
function scrollni(n) {
  let faktor;
  //faktor korektnutia scrollu tak, aby bolo v obraze co ma byt
  //korekcie pre pc verziu
  if (mobilos == false) {
    faktor = 0.04;

    //korekcia pre pagee 2, 4, 5
    if (n == "#page2" || n == "#page4" || n == "#page5") {
      faktor = 0.1;
    }
  } else {
    faktor = -0.04;

    if (n == "#page5") faktor = 0.04;
    if (n == "#page2") faktor = 0.11;
  }

  $(window).scrollTop( $(n).offset().top - faktor*$(window).height() );
  $(zatvorOverlay());
}

//otvori zvysok ONAS textu v mob verzii
function citatDalejMobil() {
  $('.dlhyPopis').show();
  $('.citatDalejMobil').hide();
  $('.citatMenejMobil').show();
}
function citatMenejMobil() {
  $('.dlhyPopis').hide();
  $('.citatDalejMobil').show();
  $('.citatMenejMobil').hide();
  $(window).scrollTop( $('#page2').offset().top - 0.15*$(window).height());
}

function nastavJazyk () {
  if (jazyk == 'sk') slovencina();
  if (jazyk == 'en') anglictina();
}
function anglictina () {
  jazyk = 'en';
  $("span[lang='sk']").hide();
  $("span[lang='en']").show();
  $(".slovencinaButton").attr("src", "assets/slovencinaBW.png");
  $(".anglictinaButton").attr("src", "assets/anglictina.png");
  sessionStorage.setItem('jazyk', 'en');
}
function slovencina () {
  jazyk = 'sk';
  $("span[lang='en']").hide();
  $("span[lang='sk']").show();
  $(".slovencinaButton").attr("src", "assets/slovencina.png");
  $(".anglictinaButton").attr("src", "assets/anglictinaBW.png");
  sessionStorage.setItem('jazyk', 'sk');
}


$(document).ready(function() {

  slides = document.getElementsByClassName("oblastPrava");
  navbar = document.getElementById("navbar");
  bezovyPanel = document.getElementById("bezovyPanel");

  //ak nie je v cache ulozeny jazyk, nastavi slovencinu, inak nacita ulozeny
  if (jazyk == null) jazyk = "sk";
  if (sessionStorage.getItem("jazyk") != null) {
    jazyk = sessionStorage.getItem("jazyk");
  }
  nastavJazyk();

  //riesi ciernobielost obrazkov tlacitiek na prepinanie jazykov
  if (jazyk == 'sk') {
    $(".slovencinaButton").attr("src", "assets/slovencina.png");
    $(".anglictinaButton").attr("src", "assets/anglictinaBW.png");
  } else {
    $(".slovencinaButton").attr("src", "assets/slovencinaBW.png");
    $(".anglictinaButton").attr("src", "assets/anglictina.png");
  }

  // if ($(window).width() < 1000) {
  //   $('.mavbar').hide();
  // }

  otvoreny = "nikto";

  let query = window.matchMedia("(max-width: 1000px)");
  responzivum(query);
  query.addListener(responzivum);

  console.log(mobilos);

  $(".bengoroKontakt").hide();
  $(".miniButtony").hide();

  $('.dlhyPopis').hide();

  $('.lavo').addClass("medzeraNapravo");


});
