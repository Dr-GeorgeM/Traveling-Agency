
                                        // LOCAL STORAGE 
// --- Check Local Storage For Color Option 
let mainColors = localStorage.getItem("color_option")

if (mainColors !== null) {
    document.documentElement.style.setProperty("--main-color",mainColors)

    // Check For Active Class 
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active")
        // Add Active Class On Element with data set === local storage item
        if(element.dataset.color === mainColors) {
            // Add Class Active
            element.classList.add("active")
        }
    })
}

let backgroundOption = true;
let backgroundInterval;
// ---Check Local Item For Background Option

// Select Backgrtound Item From Local Storage 
let backgroundLocalSorage = localStorage.getItem("background_option")

// Save Background Option In Local Storage 
if (backgroundLocalSorage !== null) {

    document.querySelectorAll(".random-background span").forEach(element => {
        element.classList.remove("active");

    if (backgroundLocalSorage === "true") {

        backgroundOption = true;

        document.querySelector(".random-background .yes").classList.add("active")

        randomImgsOption()
        
    } else {
        backgroundOption = false;

        document.querySelector(".random-background .no").classList.add("active")

        clearInterval(backgroundInterval)
    }

    });
}

                                        //    SETTING - BOX
// Setting box Toggle 
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    this.classList.toggle("fa-spin")
    this.classList.toggle("open")
    document.querySelector(".settings-box").classList.toggle("open")
    document.querySelector(".toggle-settings").classList.toggle("open")
}


                                        // change page color 
const colorLi = document.querySelectorAll(".colors-list li")
// Loop In All List Item
colorLi.forEach((color)=> {
    // click On Every List Item
    color.addEventListener("click",(e)=> {
        // Set Color In Root 
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color)

        // set Color In Local Storgae
        localStorage.setItem("color_option",e.target.dataset.color)
        handleActiveClass(e)
    })
})


                                        // Change Random Background Images Option

// 1- Select All Spans 
const randomImgs = document.querySelectorAll(".random-background")
// 2- Loop Over All Spans 
randomImgs.forEach(span => {
    // 3- Add Event Listener 
    span.addEventListener("click", (e)=> {
        // 4-Select All "Active" Classes And Loop Over Them To Remove All Acive Classes 
        handleActiveClass(e)
        if (e.target.dataset.background === 'yes') {
            backgroundOption = true
            randomImgsOption()
            localStorage.setItem("background_option", true)
        } else if (e.target.dataset.background === "no") {
            backgroundOption = false           
            clearInterval(backgroundInterval) 
            localStorage.setItem("background_option",false)
        }
    })

});


// Navigation Click To Go To Section 

const allNavLinks = document.querySelectorAll(".header-area .links li a");

// Loop Over All Links 
allNavLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        // Click To Go To The Clicked Section
        e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior : "smooth"
        })

        // Remove and Add Active Class
    //  Select All Active Elements
    const activeLinks = document.querySelectorAll(".header-area .links li a.active");
    activeLinks.forEach(activeLink => {
        activeLink.classList.remove("active");
    });
    e.target.classList.add("active");
    });
});


                                                // Select Landing Page 
let landingPage = document.querySelector(".landing-page")
// Select Images Array 
let imgArray = ["../Imgs/01.jpg","../Imgs/04.jpg","../Imgs/05.jpg"]

function  randomImgsOption () {
if (backgroundOption === true) {

    backgroundInterval = setInterval (() => {
        // Get Random Number 
        let randomNumber = Math.floor(Math.random()*imgArray.length)
        // Change Background Image Url 
        landingPage.style.background = 'url("Imgs/'+imgArray[randomNumber]+'")'
        },1000)
}
}

// Start Services Section

// Select All Skills 
let ourSkills = document.querySelector(".skills")

window.onscroll = function() {
    let skillsOffSetTop = ourSkills.offsetTop;
    let skillsOuterHight = ourSkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset;
    
    if (windowScrollTop > (skillsOffSetTop + skillsOuterHight - windowHeight)) {
        let allskills = document.querySelectorAll(".skills .skill-box .skill-progress span")
        allskills.forEach(skill => {
            
            skill.style.width = skill.dataset.progress 
        })
}}
// End Services Section 

// Start OurTraveles Section

// Select Images 
let ourGallary = document.querySelectorAll(".gallary img");

// Loop Over Images
ourGallary.forEach(img => {
    img.addEventListener("click", (e) => {

        // Creat Overlay Element 
        let Overlay = document.createElement("div")

        // Add Class To Overlay 
        Overlay.className ="popup-overlay"

        // Append Overlay To The Body
        document.body.appendChild(Overlay);

        // Creat Popup Box
        let popupBox = document.createElement("div")

        // Add Class Name To Popup Box 
        popupBox.className ="popup-box"

        // Creat Text 
        if (img.alt !== null) {
            // Creat Heading 
            let imgHeading = document.createElement("h3")
            // Craet Text For Heading 
            let imgText = document.createTextNode(img.alt)
            // Appened The Text In the Heading 
            imgHeading.appendChild(imgText);
            // Append Heading To Popup Box 
            popupBox.appendChild(imgHeading)
        }

        // Creat The Image 
        let popupImage = document.createElement("img")

        // Set Image Src
        popupImage.src = img.src;

        // Add Image To popup Box 
        popupBox.appendChild(popupImage);

        // Add The Popup Box To Body
        document.body.appendChild(popupBox)


        // Creat Close Span 
        let closeSpan = document.createElement("span")
        // Add Class Name To Close Span 
        closeSpan.className = "close-span"
        // Creat Tex Node To The Close Span 
        let closeText = document.createTextNode("X");
        // Add Text To Close Span 
        closeSpan.appendChild(closeText);
        // Add Close Span To Popup Box 
        popupBox.appendChild(closeSpan)

    })

});

// Close Popup 
document.addEventListener("click", function(e) {
    if (e.target.className === "close-span") {
        // Remove The Current Popup
        e.target.parentNode.remove()
        // Remove Overlay
        document.querySelector(".popup-overlay").remove()
    }
})
// End OurTraveles Section  

//Start Testimonial Secion

// Testimonial animation
const testimonials = document.querySelectorAll(".ts-box");

let index = 0;

const showTestimonial = () => {
testimonials[index].classList.add("show");
index++;

if (index === testimonials.length) {
    clearInterval(intervalId);
}
}

const intervalId = setInterval(showTestimonial, 1000);


//End Testimonial Secion


// Creat Handle Function For Active Class 
function handleActiveClass(ev) {
            // Remove Class Active
            ev.target.parentElement.querySelectorAll(".active").forEach(element => {
                element.classList.remove("active")
            });
            // Add Class Active 
            ev.target.classList.add("active")
}

/////// Reset Button 

// Function On Click
document.querySelector(".reset-options").onclick = function() {

    // Remove Selected data from Local Storage
    localStorage.removeItem("color_option")
    localStorage.removeItem("background_option")
    // Reload After Click
    window.location.reload()
}
//////// Animate Testimonials Section 
window.addEventListener('scroll', function() {
    let testimonials = document.querySelector('.testimonials');
    let testimonialsPosition = testimonials.getBoundingClientRect().top;
    let screenPosition = window.innerHeight / 2;

    if (testimonialsPosition < screenPosition) {
        testimonials.classList.add('visible');
    }
});

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu")
let theLink = document.querySelector(".links")

toggleBtn.onclick = function(e) {
    // Stop Propagation
    e.stopPropagation()
    // Toggle Class "menu active" On Button
    this.classList.toggle("menu-active");
    // Toggle Class "open" On Links
    theLink.classList.toggle("open")
}

//Stop Propagation On Linsk 
theLink.onclick = function(e) {
    e.stopPropagation()
};

// Click AnyWhere Outside The Menu And Toggle Button To Close The Menu 
document.addEventListener("click" , (e) => {
    if (e.target !== toggleBtn && e.target !== theLink) {
        if (theLink.classList.contains("open")) {
                // Toggle Class "menu active" On Button
    toggleBtn.classList.toggle("menu-active");
    // Toggle Class "open" On Links
    theLink.classList.toggle("open")
        }
    }
})