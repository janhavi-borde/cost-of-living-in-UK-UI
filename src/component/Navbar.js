import React, { useState }from 'react'


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
<>

<div>

<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Cost Of Living
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <a className="dropdown-item">Cost of Living</a>
        <a className="dropdown-item">Cost of Living Comparison</a>
        <a className="dropdown-item">Cost of Living Calculator</a>
        <a className="dropdown-item">Cost of Living Index (Current)</a>
        <a className="dropdown-item">Cost of Living Index</a>
        <a className="dropdown-item">Cost of Living Index by Country </a>
        <a className="dropdown-item">Cost of Living Estimator</a>
        <a className="dropdown-item">Food Prices</a>
        <a className="dropdown-item">Prices by City</a>
        <a className="dropdown-item">Prices by Country</a>
        <a className="dropdown-item">Historical Data Analysis</a>
        <a className="dropdown-item">Basket of Goods & Services</a>
        <a className="dropdown-item">Taxi Fare Calculator</a>
        <a className="dropdown-item">Gas Prices Calculator</a>
        </div>
      </li>

      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Property Prices
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <a className="dropdown-item">Property Prices</a>
        <a className="dropdown-item">Property Prices Comparison</a>
        <a className="dropdown-item">Property Prices Index (Current)</a>
        <a className="dropdown-item">Property Prices Index</a>
        <a className="dropdown-item">Property Prices Index by Country </a>
        </div>
      </li>

      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Qualiy Of Life
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <a className="dropdown-item">Quality of Life</a>
        <a className="dropdown-item">Quality of Life Comparisons</a>
        <a className="dropdown-item">Quality of Life Index (Current)</a>
        <a className="dropdown-item">Quality of Life Index</a>
        <a className="dropdown-item">Quality of Life Index by Country</a>
        <a className="dropdown-item">Crime</a>
        <a className="dropdown-item">Crime Index (Current)</a>
        <a className="dropdown-item">Crime Index</a>
        <a className="dropdown-item">Crime Index by Country</a>
        <a className="dropdown-item">Health Care</a>
        <a className="dropdown-item">Health Care Index (Current)</a>
        <a className="dropdown-item">Health Care Index</a>
        <a className="dropdown-item">Health Care Index by Country</a>
        <a className="dropdown-item">Pollution</a>
        <a className="dropdown-item">Pollution Index (Current)</a>
        <a className="dropdown-item">Pollution Index</a>
        <a className="dropdown-item">Pollution Index by Country</a>
        <a className="dropdown-item">Traffic</a>
        <a className="dropdown-item">Traffic Index (Current)</a>
        <a className="dropdown-item">Traffic Index</a>
        <a className="dropdown-item">Traffic Index by Country</a>
        </div>
      </li>

    </ul>
  </div>
</nav>


</div>



</>
  )
}

export default Navbar;