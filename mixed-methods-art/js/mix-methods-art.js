"use strict";

$(document).ready(function () {

//-----------------
// Carousel JS//
//-----------------

    $('#carouselExample').on('slide.bs.carousel', function (e) {
        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 4;
        var totalItems = $('.carousel-item').length;

        if (idx >= totalItems-(itemsPerSlide-1)) {
            var it = itemsPerSlide - (totalItems - idx);
            for (var i=0; i<it; i++) {
                // append slides to end
                if (e.direction === "left") {
                    $('.carousel-item').eq(i).appendTo('.carousel-inner');
                }
                else {
                    $('.carousel-item').eq(0).appendTo('.carousel-inner');
                }
            }
        }
    });

    $('#carouselExample').carousel({
        interval: 3000
    });

//------------------------
// Grabbing all Store Data//
//-------------------------

    function getStoreData() {
        $.get("data/paintings-poems.json", {

        }).done(function (data) {
            $("#img-cards").append(renderPaintings(data[0]));
            $("#paintings-carousel").append(renderPaintingsCarousel(data[0]));
            $("#carouselExampleIndicators").append(renderHomePagePicturesPoems(getRandom(data[0], 3), ""));
            $("#carouselExampleIndicators2").append(renderHomePagePicturesPoems(getRandom(data[1], 3), 2));
        });
    }
    getStoreData();


//-----------------
// Paintings Card Creations JS//
//-----------------


    var renderFunctions = {

        renderPaintingCarousel: function (painting) {
            var paintingName = painting.name.split(" ");
            paintingName = paintingName.join("");
            let html = '<div class="carousel-item col-md-3">';
            if (painting.index === 1) {
                html = '<div class="carousel-item col-md-3 active">';
            }
            html += `
                    <div class="panel panel-default">
                        <div class="panel-thumbnail">
                            <a href="#${paintingName}${painting.index}" title="${paintingName}" class="thumb">
                                <img class="img-fluid mx-auto d-block" src="${painting.imgFile}" alt="slide 1">
                            </a>
                        </div>
                    </div>
                </div>`;
            return html;
        },

        renderPainting: function (painting) {
            var paintingName = painting.name.split(" ");
            paintingName = paintingName.join("");
            return `
                <article class="col-12 col-md-6 col-xl-4 mt-5">
                    <a id="${paintingName}${painting.index}">
                        <div class="card">
                            <img class="card-img-top" src="${painting.imgFile}" alt="Card image cap">
                            <h4 class="card-title text-center mt-2">${painting.name}</h4>
                            <div class="card-body pt-0">
                                <p class="card-text">${painting.description}</p>
                            </div>
                            <h6 class="card-subtitle mb-2 mr-4 text-muted text-right">$${painting.price}</h6>
                        </div>
                    </a>
                </article>`;
        }
    };

    function renderPaintingsCarousel(paintings) {
        var html = '';
        for(var i = 0; i < paintings.length; i++) {
            html += renderFunctions.renderPaintingCarousel(paintings[i]);
        }
        return html;
    }


    function renderPaintings(paintings) {
        var html = '';
        for(var i = 0; i < paintings.length; i++) {
            html += renderFunctions.renderPainting(paintings[i]);
        }
        return html;
    }

    $(document).on('click', '.smooth-scroll a[href^="#"]', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 600);
    });





//---------------------------
// Home Page JS//
//----------------------------

    function homePageCarouselHide() {
        $("#carouselExampleIndicators2").hide();
        $("#carouselExampleIndicators").hide();


        $("#poems-btn").on("click", function () {

            $(this).next().slideToggle(1000);
        });

        $("#paintings-btn").on("click", function () {

            $(this).next().slideToggle(1000);
        });
    }
    homePageCarouselHide();

// Generates a new array of n number of items from first array
    function getRandom(arr, n) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }


//Makes the home page carousel
    function renderHomePagePicturesPoems(randomPaintingArray, carouselNum) {
        var html = '<ol class="carousel-indicators">';
        html += '<li data-target="#carouselExampleIndicators' + carouselNum + '" data-slide-to="0" class="active"></li>';
        html += '<li data-target="#carouselExampleIndicators' + carouselNum + '" data-slide-to="1"></li>';
        html += '<li data-target="#carouselExampleIndicators' + carouselNum + '" data-slide-to="2"></li>';
        html += '</ol>';
        html += '<div class="carousel-inner">';

        //Genertaes all n number of inner html elements
        for (var i = 0; i < randomPaintingArray.length; i++) {
            if (i === 0) {
                html += '<div class="carousel-item active">';
            } else {
                html += '<div class="carousel-item">';
            }

            html += '<img class="d-block w-100" src="' + randomPaintingArray[i].imgFile + '" alt="First slide">';
            html += '<div class="carousel-caption d-none d-md-block">';
            html += '<h5>' + randomPaintingArray[i].name + '</h5>';
            html += '<p>$' + randomPaintingArray[i].price + '</p>';
            html += '</div>';
            html += '</div>';
        }

        html += '</div>';
        html += '<a class="carousel-control-prev" href="#carouselExampleIndicators' + carouselNum + '" role="button" data-slide="prev">';
        html += '<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
        html += '<span class="sr-only">Previous</span>';
        html += '</a>';
        html += '<a class="carousel-control-next" href="#carouselExampleIndicators' + carouselNum + '" role="button" data-slide="next">';
        html += '<span class="carousel-control-next-icon" aria-hidden="true"></span>';
        html += '<span class="sr-only">Next</span>';
        html += '</a>';
        return html;
    }









});



























