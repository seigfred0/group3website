
import { animate, inView } from "motion";



const customMethods = {
    fadeInText: (element) => {
        animate(element, { opacity: [0, 0.5, 1]}, {duration: 4})
    },

}

// animate(".title-one", { opacity: [0, 0.5, 1]}, {duration: 4.5})

customMethods.fadeInText('.title-one')


// animate('.line1', { opacity: [0, 1]})


inView(".second-card", (info) => {
    // console.log("The link  ", info.target.className, " has entered the viewport")

    // animate('.line1', {
    //     transform: "translateY(-5em) translateX(-5em)"
    // })


    animate(".second-card", {
        transform: "translateY(-90%)"
    }, {duration: 3}), { target: document.querySelector(".first-card")}

    animate('.card-lines', 
    {
        opacity: [1, 0]
    }, { duration: 0.5 }
    )
})



// scroll(animate("section", { opacity: [0, 1] }))