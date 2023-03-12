// API TYPE OBJECT

const API = {
    results: [
      {
        original_title: "Ice Matcha",
        vote_count: "7$",
        poster_path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrdY8HwoZYoTVJgUnvD8DgEVxndUzN1_an9w&usqp=CAU"
      },
      {
        original_title: "My perfect vanilla cake",
        vote_count: "35$",
        poster_path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyGH129vIMT_Af8Mb_sc3WNyAhKd5VuY5jgA&usqp=CAU"
      },
      {
        original_title: "Strawberry Shortcake",
        vote_count: "35$",
        poster_path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv29YzbHW3c9OmGlOHqYRnXYJeRb1QC4fzLg&usqp=CAU"
      },
      {
        original_title: "Masala Tea",
        vote_count: "6$",
        poster_path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVISlwFdLXnuL5MmEHf2y6be7ePaExlWuzEw&usqp=CAU"
      },
      { 
        original_title: "Black Forest Cake",
        vote_count: "24$",
        poster_path: "https://livforcake.com/wp-content/uploads/2017/07/black-forest-cake-7.jpg"
      },
      {
        original_title: "Fresas Con Crema",
        vote_count: "9$",
        poster_path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPjCVFHLVk560Tm86eZTjGPTs7eL4Z9aBhfQ&usqp=CAU"
      }, 
      {
        original_title: "Fwhipped Cream",
        vote_count: "5$",
        poster_path: "https://assets.epicurious.com/photos/632882c82bc230701c615c7e/4:6/w_2623,h_3935,c_limit/SweetenedWhippedCream_RECIPE_091522_39597.jpg"
      }, 
      {
        original_title: "WHITE BREAD",
        vote_count: "4$",
        poster_path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpP6_3iVHihNHdgGj6nahdNMayJhOVp6QhBA&usqp=CAU"
      }, 
      {
        original_title: "Strawberry Cream",
        vote_count: "6$",
        poster_path: "https://cdn.shopify.com/s/files/1/1258/6665/files/BerriesNCream.png?v=1634849166"
      }, {
        original_title: "Tea Will",
        vote_count: "8$",
        poster_path: "https://imageio.forbes.com/specials-images/imageserve/5f6c061ca71799093f55fd02/0x0.jpg?format=jpg&crop=5023,3350,x0,y0,safe&width=1200"
      }
    ]
  };
  
async function getMovies() {
  
    const mainElement = document.getElementById('cake')
    const { results } = API;
    // Step 3:
    for (let i = 0; i < results.length; i++) {
      const movie = results[i];
      console.log(`${i} - `, movie);
      // object destructuring
      const { original_title, vote_count, poster_path } = movie;
  
      //   Tao 1 movie element
      const movieElement = document.createElement("div");
      movieElement.classList.add("cake-img1");
      
      const movieEleContent = `
          <img src="${poster_path}" alt="">
          <span>${original_title}</span> <br>
          <span>${vote_count}</span> <br>
          <button class="add-to-cart" data-name="${original_title}" data-price="${vote_count}">Order</button>
          `;
      movieElement.innerHTML = movieEleContent;
  
      mainElement.appendChild(movieElement);
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    getMovies();
  });

// Add to cart 

function addToCart(event) {
  const { name, price } = event.target.dataset;
  const add = {
    price: parseInt(price),
    name: name
  };
  let productList = JSON.parse(sessionStorage.getItem('productList')) || [];

  productList.push(add);

  // Lưu danh sách sản phẩm vào sessionStorage
  sessionStorage.setItem('productList', JSON.stringify(productList));
}

document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });
});

// add cart

function showCart() {
  const cartList = document.querySelector('.cart-list');
  document.getElementById('navbars').style.display = "none";
  let cartHtml = '';
  const productList = JSON.parse(sessionStorage.getItem('productList'));

  let totalPrice = 0;

  if (productList && productList.length) {
    productList.forEach((product, index) => {
      cartHtml += `
        <li id="order">
          <span>${product.name}</span>
          <span>$ ${product.price}</span>
          <button class="delete-button" onclick="removeProduct(${index})">Delete</button>
        </li>
      `;
      totalPrice += product.price;
    });
  } else {
    cartHtml = '<li>Your cart is empty</li>';
  }

  cartHtml += `
    <li>
      <span>Total:</span>
      <span>$ ${totalPrice}</span>
    </li>
  `;
  cartHtml += `
    <button id="payment">Payment</button>
  `;

  cartList.innerHTML = cartHtml;
}

function removeProduct(index) {
  const productList = JSON.parse(sessionStorage.getItem('productList'));
  productList.splice(index, 1);
  sessionStorage.setItem('productList', JSON.stringify(productList));
  showCart();
}

// Event oninput Search

function search() {
  const { results } = API;
  let valueSearch = document.getElementById('search').value;
  
  let searchResult = [];
  if (valueSearch !== '') { 
    searchResult = results.filter(value => {
      return value.original_title.toUpperCase().includes(valueSearch.toUpperCase());
    });
  }
  let titles = searchResult.map(value => value.original_title);
  let searchResultsList = document.getElementById('search-results');
  searchResultsList.innerHTML = '';
  titles.forEach(title => {
    let li = document.createElement('li');
    li.textContent = title;
    searchResultsList.appendChild(li);
  });
}

// Slide
let index = 1;
function slide_next() {
    const changeimgs = ["./img/img slider/slide1.png","./img/img slider/slide2.png","./img/img slider/slide3.png","./img/img slider/slide4.jpg"];
    document.getElementById('slide1').src = changeimgs[index];
    index++;
    if (index === 4) {
       index = 0;
    } 
}
function slide_priv() {
    const changeimgs = ["./img/img slider/slide3.png","./img/img slider/slide2.png","./img/img slider/slide1.png","./img/img slider/slide4.jpg"];
    document.getElementById('slide1').src = changeimgs[index];
    index++;
    if (index === 4) {
       index = 0;
    } 
}

// Login
function change() {
    document.getElementById('hide').style.display = "none";
    document.getElementById('login').style.display = "block";
    document.getElementById('navbars').style.display = "none";

}

function signup() {
    document.getElementById('signup').style.display = "block";
    document.getElementById('login').style.display = "none";
}

function login() {
    document.getElementById('signup').style.display = "none";
    document.getElementById('login').style.display = "block";
}
// sign set localstorage

function link_home() {
        let user = {
            email: document.getElementById('emailsignup').value,
            password: document.getElementById('pwsignup').value,
        } 
        let confirmPW = document.getElementById('cfpassword').value;
        if (confirmPW===user.password) {
          localStorage.setItem('user', JSON.stringify(user));
          alert('Successful registration')
        } else {
            alert('Incorrect password')
        }
            
    }
// check login
    function checklogin() {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const email = document.getElementById('emaillogin').value;
        const password = document.getElementById('pwlogin').value;
        
        if (storedUser.email === email && 
            storedUser.password === password) {
            alert('Logged in successfully')
        } else {
            alert('Wrong User or Password')
        }
    }








