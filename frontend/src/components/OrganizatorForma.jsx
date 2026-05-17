import { useState } from "react";
import { createOrganizator } from "../services/organizatorService";

function OrganizatorForma({ onOrganizatorCreated }) {
    const [formData, setFormData] = useState({ime: "", email: "", kompanija: ""});
    const [poruka, setPoruka] = useState("");
    const [greska, setGreska] = useState("");

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await createOrganizator(formData);
            setFormData({ime: "", email: "", kompanija: ""});
            setPoruka("Organizator uspešno kreiran.");
            setGreska("");
            onOrganizatorCreated();
        } catch (error) {
            setGreska(error.message);
            setPoruka("");
        }
    }

    return (
        <div className="card p-3 mt-4">
            <h3>Dodaj organizatora</h3>

            {poruka && <div className="alert alert-success">{poruka}</div>}
            {greska && <div className="alert alert-danger">{greska}</div>}

            <form onSubmit={handleSubmit}>
                <input type="text" name="ime" className="form-control mb-2" placeholder="Ime" value={formData.ime} onChange={handleChange} required />
                <input type="email" name="email" className="form-control mb-2" placeholder="E-mail" value={formData.email} onChange={handleChange} required />
                <input type="text" name="kompanija" className="form-control mb-2" placeholder="Kompanija" value={formData.kompanija} onChange={handleChange} required />
                <button type="submit" className="btn btn-primary">Dodaj</button>
            </form>
        </div>
    );
}

export default OrganizatorForma;