import { useEffect, useState } from "react";
import { createPosetilac, updatePosetilac } from "../services/posetilacService";

function PosetilacForma({ onPosetilacCreated, posetilacZaIzmenu, setPosetilacZaIzmenu }) {
    const [formData, setFormData] = useState({ime: "", prezime: "", email: "", telefon: ""});
    const [poruka, setPoruka] = useState("");
    const [greska, setGreska] = useState("");

    useEffect(() => {
        if (posetilacZaIzmenu) {
            setFormData({
                ime: posetilacZaIzmenu.ime,
                prezime: posetilacZaIzmenu.prezime,
                email: posetilacZaIzmenu.email,
                telefon: posetilacZaIzmenu.telefon
            });
        } 
    }, [posetilacZaIzmenu]);

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (posetilacZaIzmenu) {
                await updatePosetilac(posetilacZaIzmenu.id, formData);
                setPoruka("Posetilac uspešno ažuriran.");
                setPosetilacZaIzmenu(null);
            } else {
                await createPosetilac(formData);
                setPoruka("Posetilac uspešno kreiran!");
            }

            setFormData({ime: "", prezime: "", email: "", telefon: ""});
            setGreska("");
            onPosetilacCreated();
        } catch (error) {
            setGreska(error.message);
            setPoruka("");
        }
    }

    return (
        <div className="card p-3 mt-4">
            <h3>{posetilacZaIzmenu ? "Izmeni posetioca" : "Dodaj posetioca"}</h3>
            {poruka && <div className="alert alert-success">{poruka}</div>}
            {greska && <div className="alert alert-danger">{greska}</div>}

            <form onSubmit={handleSubmit}>
                <input type="text" name="ime" placeholder="Ime" className="form-control mb-3" value={formData.ime} onChange={handleChange} required />
                <input type="text" name="prezime" placeholder="Prezime" className="form-control mb-3" value={formData.prezime} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" className="form-control mb-3" value={formData.email} onChange={handleChange} required />
                <input type="text" name="telefon" placeholder="Telefon" className="form-control mb-3" value={formData.telefon} onChange={handleChange} required />
                <button type="submit" className="btn btn-primary">{posetilacZaIzmenu ? "Izmeni" : "Dodaj"}</button>
                {posetilacZaIzmenu && (
                    <button type="button" className="btn btn-secondary ms-2" 
                        onClick={() => {
                            setPosetilacZaIzmenu(null);
                            setFormData({ ime: "", prezime: "", email: "", telefon: "" })
                        }}>Poništi izmenu</button>
                )}
            </form>
        </div>
    );
}

export default PosetilacForma;