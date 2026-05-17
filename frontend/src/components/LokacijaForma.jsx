import { useState } from "react";
import { createLokacija } from "../services/lokacijaService";

function LokacijaForma({ onLokacijaCreated }) {
    const [formData, setFormData] = useState({naziv: "", adresa: "", grad: "", kapacitet: ""});
    const [poruka, setPoruka] = useState("");
    const [greska, setGreska] = useState("");

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await createLokacija({...formData, kapacitet: Number(formData.kapacitet)});
            setFormData({naziv: "", adresa: "", grad: "", kapacitet: ""});
            setPoruka("Lokacija uspešno kreirana!");
            setGreska("");
            onLokacijaCreated();
        } catch (error) {
            setGreska("Greška prilikom kreiranja lokacije.");
            setPoruka("");
        }
    }

    return (
        <div className="card p-3 mt-4">
            <h3>Dodaj lokaciju</h3>
            {poruka && <div className="alert alert-success">{poruka}</div>}
            {greska && <div className="alert alert-danger">{greska}</div>}

            <form onSubmit={handleSubmit}>
                <input type="text" name="naziv" placeholder="Naziv" className="form-control mb-3" value={formData.naziv} onChange={handleChange} required />
                <input type="text" name="adresa" placeholder="Adresa" className="form-control mb-3" value={formData.adresa} onChange={handleChange} required />
                <input type="text" name="grad" placeholder="Grad" className="form-control mb-3" value={formData.grad} onChange={handleChange} required />
                <input type="number" name="kapacitet" placeholder="Kapacitet" className="form-control mb-3" value={formData.kapacitet} onChange={handleChange} required />
                <button type="submit" className="btn btn-primary">Dodaj</button>
            </form>
        </div>
    );
}

export default LokacijaForma;