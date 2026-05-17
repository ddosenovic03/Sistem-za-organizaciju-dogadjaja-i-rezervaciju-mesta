import { useEffect, useState } from "react";
import { createDogadjaj, updateDogadjaj } from "../services/dogadjajService";
import { getOrganizatori } from "../services/organizatorService";
import { getLokacije } from "../services/lokacijaService";

function DogadjajForma({onDogadjajCreated, dogadjajZaIzmenu, setDogadjajZaIzmenu}) {
    const [formData, setFormData] = useState({naziv: "", opis: "", datumOdrzavanja: "", maksBrMesta: "", organizatorId: "", lokacijaId: ""});
    const [organizatori, setOrganizatori] = useState([]);
    const [lokacije, setLokacije] = useState([]);
    const [greska, setGreska] = useState("");
    const [poruka, setPoruka] = useState("");

    async function ucitajPodatke() {
        try {
            const organizatoriData = await getOrganizatori();
            const lokacijeData = await getLokacije();

            setOrganizatori(organizatoriData);
            setLokacije(lokacijeData);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => { ucitajPodatke(); }, []);

    useEffect(() => {
        if (dogadjajZaIzmenu) {
            setFormData({
                naziv: dogadjajZaIzmenu.naziv,
                opis: dogadjajZaIzmenu.opis,
                datumOdrzavanja: dogadjajZaIzmenu.datumOdrzavanja,
                maksBrMesta: dogadjajZaIzmenu.maksBrMesta,
                organizatorId: dogadjajZaIzmenu.organizatorId,
                lokacijaId: dogadjajZaIzmenu.lokacijaId
            });
        }
    }, [dogadjajZaIzmenu]);

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (dogadjajZaIzmenu) {
                await updateDogadjaj(dogadjajZaIzmenu.id, {...formData, maksBrMesta: Number(formData.maksBrMesta), organizatorId: Number(formData.organizatorId), lokacijaId: Number(formData.lokacijaId)});
                setDogadjajZaIzmenu(null);
                setPoruka("Događaj uspešno ažuriran.");
            } else {
                await createDogadjaj({...formData, maksBrMesta: Number(formData.maksBrMesta), organizatorId: Number(formData.organizatorId), lokacijaId: Number(formData.lokacijaId)});
                setPoruka("Događaj uspešno kreiran.");
            }

            setFormData({naziv: "", opis: "", datumOdrzavanja: "", brSlobodnihMesta: "", maksBrMesta: "",organizatorId: "", lokacijaId: ""});
            setGreska("");
            onDogadjajCreated();
        } catch (error) {
            setGreska(error.message);
        }
    }

    return (
        <div className="card p-3 mt-4">
            <h2>{ dogadjajZaIzmenu ? "Izmeni događaj" : "Dodaj događaj" }</h2>

            {greska && <div className="alert alert-danger">{greska}</div>}
            {poruka && <div className="alert alert-success">{poruka}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" name="naziv" placeholder="Naziv" className="form-control" value={formData.naziv} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <textarea name="opis" placeholder="Opis" className="form-control" value={formData.opis} onChange={handleChange} required></textarea>
                </div>
                <div className="mb-3">
                    <input type="datetime-local" name="datumOdrzavanja" className="form-control" value={formData.datumOdrzavanja} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="number" name="maksBrMesta" placeholder="Maksimalan broj mesta" className="form-control" value={formData.maksBrMesta} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <select name="organizatorId" className="form-control" value={formData.organizatorId} onChange={handleChange} required>
                        <option value="">Izaberite organizatora</option>
                        {organizatori.map(org => (
                            <option key={org.id} value={org.id}>{org.ime} - {org.email}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <select name="lokacijaId" className="form-control" value={formData.lokacijaId} onChange={handleChange} required>
                        <option value="">Izaberite lokaciju</option>
                        {lokacije.map(lok => (
                            <option key={lok.id} value={lok.id}>{lok.naziv} - {lok.adresa}, {lok.grad} - Kapacitet: {lok.kapacitet}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">{ dogadjajZaIzmenu ? "Izmeni" : "Dodaj" }</button>
                { dogadjajZaIzmenu && (
                    <button type="button" className="btn btn-secondary ms-2"
                        onClick={() => {
                            setDogadjajZaIzmenu(null);
                            setFormData({ naziv: "", opis: "", datumOdrzavanja: "", maksBrMesta: "", organizatorId: "", lokacijaId: "", });
                        }}>Poništi izmenu</button>
                )}
            </form>
        </div>
    );
}

export default DogadjajForma;