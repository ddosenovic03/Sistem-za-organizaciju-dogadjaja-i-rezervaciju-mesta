import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">Početna</Link>
                <div className="navbar-nav">
                    <Link className="nav-link" to="/dogadjaji">Događaji</Link>
                    <Link className="nav-link" to="/organizatori">Organizatori</Link>
                    <Link className="nav-link" to="/rezervacije">Rezervacije</Link>
                    <Link className="nav-link" to="/lokacije">Lokacije</Link>
                    <Link className="nav-link" to="/posetioci">Posetioci</Link>
                </div>
            </div>      
        </nav>
    );
}

export default Navbar;