import { useEffect, useState } from "react";
import { getRezervacije, otkaziRezervaciju } from "../services/rezervacijaService";

function RezervacijaPage() {
    const [rezervacije, setRezervacije] = useState([]);
    const [error, setError] = useState(null);
    const [poruka, setPoruka] = useState(null);

    async function ucitajRezervacije() {
        try {
            const data = await getRezervacije();
            setRezervacije(data);
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        ucitajRezervacije();
    }, []);

    async function handleOtkazi(id) {
        try {
            await otkaziRezervaciju(id);
            setPoruka('Rezervacija je otkazana.');
            setError("");
            ucitajRezervacije();
        } catch (error) {
            setError(error.message);
            setPoruka("");
        }
    }

    return (
        <div>
            <h2>Rezervacije</h2>

            { error && <p style={{color: 'red'}}>{error}</p> }
            { poruka && <p style={{color: 'green'}}>{poruka}</p> }

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Događaj</th>
                        <th>Posetilac</th>
                        <th>Broj mesta</th>
                        <th>Datum rezervacije</th>
                        <th>Status</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {rezervacije.map((r) => (
                        <tr key={r.id}>
                            <td>{r.dogadjajNaziv}</td>
                            <td>{r.posetilacIme} {r.posetilacPrezime}</td>
                            <td>{r.brMesta}</td>
                            <td>{r.datumRezervacije}</td>
                            <td>{r.status}</td>
                            <td>
                                {r.status === "AKTIVNA" && (
                                    <button className="btn btn-warning btn-sm" onClick={() => handleOtkazi(r.id)}>Otkaži</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RezervacijaPage;
