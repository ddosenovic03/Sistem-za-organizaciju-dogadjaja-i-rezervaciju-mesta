import { useEffect, useState } from "react";
import { createLokacija, updateLokacija } from "../services/lokacijaService";

function LokacijaForma({ onLokacijaCreated, lokacijaZaIzmenu, setLokacijaZaIzmenu }) {
    const [formData, setFormData] = useState({naziv: "", adresa: "", grad: "", kapacitet: ""});
    const [poruka, setPoruka] = useState("");
    const [greska, setGreska] = useState("");

    useEffect(() => {
        if (lokacijaZaIzmenu) {
            setFormData({
                naziv: lokacijaZaIzmenu.naziv,
                adresa: lokacijaZaIzmenu.adresa,
                grad: lokacijaZaIzmenu.grad,
                kapacitet: lokacijaZaIzmenu.kapacitet
            });
        }
    }, [lokacijaZaIzmenu]);

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (lokacijaZaIzmenu) {
                await updateLokacija(lokacijaZaIzmenu.id, {...formData, kapacitet: Number(formData.kapacitet)});
                setPoruka("Lokacija uspešno ažurirana!");
                setLokacijaZaIzmenu(null);
            } else {
                await createLokacija({...formData, kapacitet: Number(formData.kapacitet)});
                setPoruka("Lokacija uspešno kreirana!");
            }

            setFormData({naziv: "", adresa: "", grad: "", kapacitet: ""});
            setGreska("");
            onLokacijaCreated();
        } catch (error) {
            setGreska(error.message);
            setPoruka("");
        }
    }

    return (
        <div className="card p-3 mt-4">
            <h3>{ lokacijaZaIzmenu ? "Izmeni lokaciju" : "Dodaj lokaciju" }</h3>
            {poruka && <div className="alert alert-success">{poruka}</div>}
            {greska && <div className="alert alert-danger">{greska}</div>}

            <form onSubmit={handleSubmit}>
                <input type="text" name="naziv" placeholder="Naziv" className="form-control mb-3" value={formData.naziv} onChange={handleChange} required />
                <input type="text" name="adresa" placeholder="Adresa" className="form-control mb-3" value={formData.adresa} onChange={handleChange} required />
                <input type="text" name="grad" placeholder="Grad" className="form-control mb-3" value={formData.grad} onChange={handleChange} required />
                <input type="number" name="kapacitet" placeholder="Kapacitet" className="form-control mb-3" value={formData.kapacitet} onChange={handleChange} required />
                <button type="submit" className="btn btn-primary">{ lokacijaZaIzmenu ? "Izmeni" : "Dodaj" }</button>
                { lokacijaZaIzmenu && ( 
                    <button type="button" className="btn btn-secondary ms-2" 
                        onClick={() => {
                            setLokacijaZaIzmenu(null);
                            setFormData({naziv: "", adresa: "", grad: "", kapacitet: ""});
                        }}>Poništi izmenu</button>
                )}
            </form>
        </div>
    );
}

export default LokacijaForma;