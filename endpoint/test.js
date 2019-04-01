const st = {
    name:"123",
    age:"234"
}



let st1 = Object.create(st);
st1.address="hello"

console.log(st.address)
console.log(st1.address)
console.log(st1.prototype)