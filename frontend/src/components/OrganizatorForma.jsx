import { useEffect, useState } from "react";
import { createOrganizator, updateOrganizator } from "../services/organizatorService";

function OrganizatorForma({ onOrganizatorCreated, organizatorZaIzmenu, setOrganizatorZaIzmenu }) {
    const [formData, setFormData] = useState({ime: "", email: "", kompanija: ""});
    const [poruka, setPoruka] = useState("");
    const [greska, setGreska] = useState("");

    useEffect(() => {
        if (organizatorZaIzmenu) {
            setFormData({
                ime: organizatorZaIzmenu.ime,
                email: organizatorZaIzmenu.email,
                kompanija: organizatorZaIzmenu.kompanija
            });
        }
    }, [organizatorZaIzmenu]);

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (organizatorZaIzmenu) {
                await updateOrganizator(organizatorZaIzmenu.id, formData);
                setPoruka("Organizator uspešno ažuriran.");
                setOrganizatorZaIzmenu(null);
            } else {
                await createOrganizator(formData);
                setPoruka("Organizator uspešno kreiran.");
            }

            setFormData({ime: "", email: "", kompanija: ""});
            setGreska("");
            onOrganizatorCreated();
        } catch (error) {
            setGreska(error.message);
            setPoruka("");
        }
    }

    return (
        <div className="card p-3 mt-4">
            <h3>{ organizatorZaIzmenu ? "Izmeni organizatora" : "Dodaj organizatora" }</h3>

            {poruka && <div className="alert alert-success">{poruka}</div>}
            {greska && <div className="alert alert-danger">{greska}</div>}

            <form onSubmit={handleSubmit}>
                <input type="text" name="ime" className="form-control mb-2" placeholder="Ime" value={formData.ime} onChange={handleChange} required />
                <input type="email" name="email" className="form-control mb-2" placeholder="E-mail" value={formData.email} onChange={handleChange} required />
                <input type="text" name="kompanija" className="form-control mb-2" placeholder="Kompanija" value={formData.kompanija} onChange={handleChange} required />
                <button type="submit" className="btn btn-primary">{ organizatorZaIzmenu ? "Izmeni" : "Dodaj" }</button>
                { organizatorZaIzmenu && ( 
                    <button type="button" className="btn btn-secondary ms-2" 
                        onClick={() => {
                            setOrganizatorZaIzmenu(null);
                            setFormData({ ime: "", email: "", kompanija: "", });
                    }}>Poništi izmenu</button>
                )}            
            </form>
        </div>
    );
}

export default OrganizatorForma;