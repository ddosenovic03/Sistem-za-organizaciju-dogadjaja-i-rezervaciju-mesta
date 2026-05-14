import { useEffect, useState } from "react";
import { getDogadjaji } from "../services/dogadjajService";
import DogadjajForma from "./DogadjajForma";
import RezervacijaForma from "./RezervacijaForma";

function DogadjajList() {
    const [dogadjaji, setDogadjaji] = useState([]);
    const [greska, setGreska] = useState("");

    async function ucitajDogadjaje() {
        try {
            const data = await getDogadjaji();
            setDogadjaji(data);
        } catch (error) {
            setGreska(error.message);
        }
    }

    useEffect(() => { ucitajDogadjaje(); }, []);

    return (
        <div className="mt-4">
            <DogadjajForma onDogadjajCreated={ucitajDogadjaje} />

            <h2>Događaji</h2>

            {greska && <div className="alert alert-danger">{greska}</div>}

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Datum</th>
                        <th>Slobodna mesta</th>
                        <th>Status</th>
                        <th>Organizator</th>
                        <th>Lokacija</th>
                        <th>Rezervacija</th>
                    </tr>
                </thead>
                <tbody>
                    {dogadjaji.map(d => (
                        <tr key={d.id}>
                            <td>{d.naziv}</td>
                            <td>{d.datumOdrzavanja}</td>
                            <td>{d.brSlobodnihMesta}</td>
                            <td>{d.status}</td>
                            <td>{d.organizatorIme}</td>
                            <td>{d.lokacijaNaziv}</td>
                            <td><RezervacijaForma dogadjajId={d.id} onRezervacijaCreated={ucitajDogadjaje} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DogadjajList;