import mitt from "mitt";
const emitter = mitt()

emitter.on('sad', () => {
    console.log('success');
    
})

setTimeout(() => {
    emitter.emit('sad')
},2000)



export default emitter