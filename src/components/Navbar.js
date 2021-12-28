import $ from 'jquery'
import { Link } from 'react-router-dom'
import React from 'react'

export default function Navbar() {
    let closeNavMenu = () => $('#navmenu.show').slideUp(() => { 
        $('#navmenu').removeClass('show')
        $('#navmenu').attr('style', null)
    })

    return (
            <nav id="navbar" className="navbar navbar-expand-lg py-3 fixed-top">
                <div className="container">
                    <a id="spot-finder-logo" onClick={() => window.location.reload()} className="navbar-brand mt-0 ms-2 fw-bold fs-1">
                        {/* style={{width: '15%', minWidth: '50px'}} */}
                        SpotFinder
                    </a>
                    <button id="navbar-toggler" className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu" aria-controls="navmenu" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* <div className="collapse navbar-collapse" id="navmenu">
                        <ul className="navbar-nav ms-auto gap-lg-4 gap-2 mt-2">
                            <li className="nav-item">
                                <Link to="/" className="nav-link btn btn-outline-warning fs-4" onClick={closeNavMenu}>HOME</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/projects" className="nav-link btn btn-outline-warning fs-4" onClick={closeNavMenu}>PROJECTS</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/resume" className="nav-link btn btn-outline-warning fs-4" onClick={closeNavMenu}>RÉSUMÉ</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/blog" className="nav-link btn btn-outline-warning fs-4" onClick={closeNavMenu}>BLOG</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-link btn btn-outline-warning fs-4" onClick={closeNavMenu}>CONTACT</Link>
                            </li>
                        </ul>
                    </div> */}
                </div>
            </nav>
    )
}
