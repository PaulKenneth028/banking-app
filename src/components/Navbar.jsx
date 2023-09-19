import React from "react";

const Navbar = () => {
    return (
    <div className="navContainer">
                <nav>
                    <ul>
                    
                        <li className="text-4xl" id="headerLogo"><img src="src/components/Images/background-logo.png" alt="imgLogo" id="imgLogo"/>Bank mo to</li>
                        <li><a href="">Home</a></li>
                        <li><a href="">Support</a></li>
                        <li><a href="">Contact</a></li>
                        <li><a href="">About</a></li>
                    </ul>
                </nav>
    </div>
)
}

export default Navbar