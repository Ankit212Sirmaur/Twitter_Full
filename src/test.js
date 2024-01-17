console.log("hi");
setTimeout(() => {
    console.log("outer settimeout");
    setTimeout(() => {
        console.log("inner settimeout");
    }, 3000);
    console.log("last console");
}, 5000);