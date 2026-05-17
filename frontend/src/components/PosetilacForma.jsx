import { useState } from "react";
import { createPosetilac } from "../services/posetilacService";

function PosetilacForma({ onPosetilacCreated }) {
    const [formData, setFormData] = useState({ime: "", prezime: "", email: "", telefon: ""});
    const [poruka, setPoruka] = useState("");
    const [greska, setGreska] = useState("");

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await createPosetilac(formData);
            setFormData({ime: "", prezime: "", email: "", telefon: ""});
            setPoruka("Posetilac uspešno kreiran!");
            setGreska("");
            onPosetilacCreated();
        } catch (error) {
            setGreska("Greška prilikom kreiranja posetioca.");
            setPoruka("");
        }
    }

    return (
        <div className="card p-3 mt-4">
            <h3>Dodaj posetioca</h3>
            {poruka && <div className="alert alert-success">{poruka}</div>}
            {greska && <div className="alert alert-danger">{greska}</div>}

            <form onSubmit={handleSubmit}>
                <input type="text" name="ime" placeholder="Ime" className="form-control mb-3" value={formData.ime} onChange={handleChange} required />
                <input type="text" name="prezime" placeholder="Prezime" className="form-control mb-3" value={formData.prezime} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" className="form-control mb-3" value={formData.email} onChange={handleChange} required />
                <input type="text" name="telefon" placeholder="Telefon" className="form-control mb-3" value={formData.telefon} onChange={handleChange} required />
                <button type="submit" className="btn btn-primary">Dodaj</button>
            </form>
        </div>
    );
}

export default PosetilacForma;