import { useEffect, useState } from "react";
import { createDogadjaj } from "../services/dogadjajService";
import { getOrganizatori } from "../services/organizatorService";
import { getLokacije } from "../services/lokacijaService";

function DogadjajForma({onDogadjajCreated}) {
    const [formData, setFormData] = useState({naziv: "", opis: "", datumOdrzavanja: "", maksBrMesta: "",organizatorId: "", lokacijaId: ""});
    const [organizatori, setOrganizatori] = useState([]);
    const [lokacije, setLokacije] = useState([]);
    const [greska, setGreska] = useState("");

    useEffect(() => {
        ucitajPodatke();
    }, []);

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

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await createDogadjaj({
                ...formData,
                maksBrMesta: Number(formData.maksBrMesta),
                organizatorId: Number(formData.organizatorId),
                lokacijaId: Number(formData.lokacijaId)
            });

            setFormData({naziv: "", opis: "", datumOdrzavanja: "", maksBrMesta: "",organizatorId: "", lokacijaId: ""});
            setGreska("");

            onDogadjajCreated();
        } catch (error) {
            setGreska(error.message);
        }
    }

    return (
        <div className="card p-3 mt-4">
            <h2>Dodaj događaj</h2>
            {greska && <div className="alert alert-danger">{greska}</div>}

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
                            <option key={org.id} value={org.id}>{org.email}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <select name="lokacijaId" className="form-control" value={formData.lokacijaId} onChange={handleChange} required>
                        <option value="">Izaberite lokaciju</option>
                        {lokacije.map(lok => (
                            <option key={lok.id} value={lok.id}>{lok.naziv} - {lok.adresa} - {lok.grad}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Dodaj</button>
            </form>
        </div>
    );
}

export default DogadjajForma;