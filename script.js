$(() => {
  $('form button').click(function (e) {
    e.preventDefault();
    let title = $('#inputName').val();
    let year = $('inputYear').val();
    let type = $('form option:selected').text();
    $.ajax(`http://www.omdbapi.com/?t=${title}&y=${year}&type=${type}&apikey=d4fe186b`, {
      url: `http://www.omdbapi.com/?t=${title}&y=${year}&type=${type}&apikey=d4fe186b`,
      data: $('form').serialize(),
      type: "POST",
      success: function (data) {
        if (data.Title === undefined) {
          $('.movies-wrap').append('<div class="movie-block">Movie not found!</div>')
        } else {
          $('.movies-wrap').append(`<div class="movie-block"><img src="${data.Poster}" alt="Image"><div class="movie-block-info"><p>${data.Genre}</p><p>${data.Title}</p><p>${data.Year}</p><a>Details</a></div></div>`)
        }
      },
      fail: function () {
        console.log('fail')
      }
    })
  })
  $(document).on('click', '.movie-block a', function () {
    let detailsYear = this.previousElementSibling;
    let detailsTitle = detailsYear.previousElementSibling;
    let detailsGenre = detailsTitle.previousElementSibling;
    detailsYear = detailsYear.innerText;
    detailsGenre = detailsGenre.innerText;
    detailsTitle = detailsTitle.innerText;
    localStorage.setItem('detailsYear', detailsYear);
    localStorage.setItem('detailsGenre', detailsGenre);
    localStorage.setItem('detailsTitle', detailsTitle);
    window.open('/hw-js-35/details.html', '_blank');
  })
})