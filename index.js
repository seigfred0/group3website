
import { animate, inView } from "motion";



const customMethods = {
    fadeInText: (element) => {
        animate(element, { opacity: [0, 0.5, 1]}, {duration: 4})
    },
    moveUpText: (x) => {
        animate(x, { transform: 'translateY(-2em)'}, { duration: 2})

    },
}


customMethods.fadeInText('.title-one')
customMethods.moveUpText('.paragraph-one')

inView(".line3", () => {
    setTimeout(() => {
        animate('.animateLine-four', { display: 'flex' })

        
    }, 5000)
    
    setTimeout(() => {
        animate('.card-title_three', { display: 'block' })
        animate('.card-text_three', { display: 'block' })


        customMethods.fadeInText('.card-title_three')
        customMethods.fadeInText('.card-text_three')

    }, 7000)
})

inView(".second-card", (info) => {
   
    inView(".card-title_one", () => {
        
        animate('.animateLine-three', { display: 'flex'})
        
    })
    
    customMethods.fadeInText('.card-title_two')
    customMethods.fadeInText('.secondcard-paragraph')
    // animate('.secondcard-paragraph', { opacity : [ 0, 0.5, 1]})

    animate('.card-title_two', { color: '#508A59'}, { duration: 7 })


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