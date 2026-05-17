import { useEffect, useState } from "react";
import { getLokacije, deleteLokacija } from "../services/lokacijaService";
import LokacijaForma from "./LokacijaForma";

function LokacijaList() {
    const [lokacije, setLokacije] = useState([]);
    const [lokacijaZaIzmenu, setLokacijaZaIzmenu] = useState(null);
    const [greska, setGreska] = useState("");

    async function ucitajLokacije() {
        try {
            const data = await getLokacije();
            setLokacije(data);
            setGreska("");
        } catch (error) {
            setGreska(error.message);
        }
    }
    useEffect(() => { ucitajLokacije(); }, []);

    async function obrisiLokaciju(id) {
        try {
            await deleteLokacija(id);
            ucitajLokacije();
            setGreska("");
        } catch (error) {
            setGreska(error.message);
        }
    }

    return (
        <div className="mt-4">
            <LokacijaForma 
                onLokacijaCreated={ucitajLokacije} 
                lokacijaZaIzmenu={lokacijaZaIzmenu}
                setLokacijaZaIzmenu={setLokacijaZaIzmenu} />

            <h2 className="mt-4">Lokacije</h2>
            {greska && <div className="alert alert-danger">{greska}</div>}

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Adresa</th>
                        <th>Grad</th>
                        <th>Kapacitet</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {lokacije.map(l => (
                        <tr key={l.id}>
                            <td>{l.naziv}</td>
                            <td>{l.adresa}</td>
                            <td>{l.grad}</td>
                            <td>{l.kapacitet}</td>
                            <td>
                                <button className="btn btn-warning btn-sm" onClick={() => setLokacijaZaIzmenu(l)}>Izmeni</button>
                                <button className="btn btn-danger btn-sm" onClick={() => obrisiLokaciju(l.id)}>Obriši</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LokacijaList;