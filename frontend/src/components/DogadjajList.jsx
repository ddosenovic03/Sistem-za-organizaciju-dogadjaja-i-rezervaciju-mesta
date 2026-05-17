import { useEffect, useState } from "react";
import { getDogadjaji, deleteDogadjaj, pretraziDogadjaje, getNajpopularnijiDogadjaji } from "../services/dogadjajService";
import DogadjajForma from "./DogadjajForma";
import RezervacijaForma from "./RezervacijaForma";

function DogadjajList() {
    const [dogadjaji, setDogadjaji] = useState([]);
    const [greska, setGreska] = useState("");
    const [poruka, setPoruka] = useState("");
    const [dogadjajZaIzmenu, setDogadjajZaIzmenu] = useState(null);
    const [filteri, setFilteri] = useState({ naziv: "", grad: "", datum: "", status: "" });

    async function ucitajDogadjaje() {
        try {
            const data = await getDogadjaji();
            setDogadjaji(data);
        } catch (error) {
            setGreska(error.message);
        }
    }
    useEffect(() => { ucitajDogadjaje(); }, []);

    async function obrisiDogadjaj(id) {
        try {
            await deleteDogadjaj(id);
            setPoruka("Događaj uspešno obrisan.");
            ucitajDogadjaje();
        } catch (error) {
            setGreska(error.message);
        }
    }

    function handleFilterChange(e) {
        setFilteri({ ...filteri, [e.target.name]: e.target.value });
    }

    async function handlePretraga(e) {
        try {
            const data = await pretraziDogadjaje(filteri);
            setDogadjaji(data);
            setGreska("");
        } catch (error) {
            setGreska(error.message);
        }
    }

    async function handleNajpopularniji() {
        try {
            const data = await getNajpopularnijiDogadjaji();
            setDogadjaji(data);
            setGreska("");
        } catch (error) {
            setGreska(error.message);
        }
    }

    function resetujFiltere() {
        setFilteri({ naziv: "", grad: "", datum: "", status: "" });
        ucitajDogadjaje();
    }

    return (
        <div className="mt-4">
            <DogadjajForma 
                onDogadjajCreated={ucitajDogadjaje}
                dogadjajZaIzmenu={dogadjajZaIzmenu}
                setDogadjajZaIzmenu={setDogadjajZaIzmenu}
            />

            <h2>Događaji</h2>

            {poruka && <div className="alert alert-success">{poruka}</div>}
            {greska && <div className="alert alert-danger">{greska}</div>}

            <div className="card p-3 mt-4">
                <h3>Pretraga događaja</h3>
                <div className="row">
                    <div className="col-md-3">
                        <input type="text" className="form-control" placeholder="Naziv" name="naziv" value={filteri.naziv} onChange={handleFilterChange} />
                    </div>
                    <div className="col-md-3">
                        <input type="text" className="form-control" placeholder="Grad" name="grad" value={filteri.grad} onChange={handleFilterChange} />
                    </div>
                    <div className="col-md-3">
                        <input type="date" className="form-control" placeholder="Datum" name="datum" value={filteri.datum} onChange={handleFilterChange} />
                    </div>
                    <div className="col-md-3">
                        <select className="form-control" name="status" value={filteri.status} onChange={handleFilterChange}>
                            <option value="">Svi statusi</option>
                            <option value="AKTIVAN">AKTIVAN</option>
                            <option value="POPUNJEN">POPUNJEN</option>
                        </select>
                    </div>
                </div>
                <div className="mt-3 d-flex gap-2">
                    <button className="btn btn-primary" onClick={handlePretraga}>Pretraži</button>
                    <button className="btn btn-secondary" onClick={resetujFiltere}>Resetuj</button>
                    <button className="btn btn-info" onClick={handleNajpopularniji}>Najpopularniji</button>
                </div>
            </div>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Opis</th>
                        <th>Datum</th>
                        <th>Maksimalan broj mesta</th>
                        <th>Slobodna mesta</th>
                        <th>Status</th>
                        <th>Organizator</th>
                        <th>Lokacija</th>
                        <th>Rezervacija</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {dogadjaji.map(d => (
                        <tr key={d.id}>
                            <td>{d.naziv}</td>
                            <td>{d.opis}</td>
                            <td>{d.datumOdrzavanja}</td>
                            <td>{d.maksBrMesta}</td>
                            <td>{d.brSlobodnihMesta}</td>
                            <td>{d.status}</td>
                            <td>{d.organizatorIme}</td>
                            <td>{d.lokacijaNaziv}</td>
                            <td><RezervacijaForma dogadjajId={d.id} onRezervacijaCreated={ucitajDogadjaje} /></td>
                            <td>
                                <button className="btn btn-warning btn-sm" onClick={() => setDogadjajZaIzmenu(d)}>Izmeni</button>
                                <button className="btn btn-danger btn-sm" onClick={() => obrisiDogadjaj(d.id)}>Obriši</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DogadjajList;