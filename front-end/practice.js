function whatIsInAName(collection, source) {
    // "What's in a name? that which we call a rose
    // By any other name would smell as sweet.”
    // -- by William Shakespeare, Romeo and Juliet
    let souceKeys = Object.keys(source);
    console.log(Object.keys(source));
    console.log(souceKeys);
    console.log("Source Length = " + souceKeys.length);
  
    // filter the collection
    return collection.filter(obj => {
      for (let i = 0; i < souceKeys.length; i++) {
        console.log(obj[souceKeys[i]]);
        if (obj[souceKeys[i]] !== source[souceKeys[i]]) {
            
          return false;
        }
      }
      return true;
    });
  }

  let res = whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });

  console.log(res);