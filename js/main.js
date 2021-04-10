$(window).on("scroll", function() {
  if ($(window).scrollTop()) {
    $("nav").addClass("black");
  } else {
    $("nav").removeClass("black");
  }
});

function openSidebar() {
  document.getElementById("sidebar").classList.add("show");
}
function closeSidebar() {
  document.getElementById("sidebar").classList.remove("show");
}
