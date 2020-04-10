const s = '1 beer, 2 vodka, 3 wine';

function hydrate(s) {
    var numbers = [1,2,3,4,5,6,7,8,9];
    var water = 0;
    for (let index = 0; index < s.length; index++) {
        const element = parseInt(s[index]);
        for (let i = 0; i < numbers.length; i++) {
            const num = numbers[i];
            if (element == num) {
                water += num;
            }
        }
    }
    console.log(water + " glasses of water");
  }

  setTimeout(() => {
    hydrate(s);
  }, 10)

