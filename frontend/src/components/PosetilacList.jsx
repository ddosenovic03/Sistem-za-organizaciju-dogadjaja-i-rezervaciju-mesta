import { useEffect, useState } from "react";
import { getPosetioci, deletePosetilac } from "../services/posetilacService";
import PosetilacForma from "./PosetilacForma";

function PosetilacList() {
    const [posetioci, setPosetioci] = useState([]);
    const [posetiociZaIzmenu, setPosetiociZaIzmenu] = useState(null);
    const [greska, setGreska] = useState("");

    async function ucitajPosetioce() {
        try {
            const data = await getPosetioci();
            setPosetioci(data);
            setGreska("");
        } catch (error) {
            setGreska(error.message);
        }
    }
    useEffect(() => { ucitajPosetioce(); }, []);

    async function obrisiPosetioca(id) {
        try {
            await deletePosetilac(id);
            ucitajPosetioce();
            setGreska("");
        } catch (error) {
            setGreska(error.message);
        }
    }

    return (
        <div className="mt-4">
            <PosetilacForma 
                onPosetilacCreated={ucitajPosetioce}
                posetilacZaIzmenu={posetiociZaIzmenu}
                setPosetilacZaIzmenu={setPosetiociZaIzmenu}/>

            <h2 className="mt-4">Posetioci</h2>
            {greska && <div className="alert alert-danger">{greska}</div>}

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Email</th>
                        <th>Telefon</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {posetioci.map((posetilac) => (
                        <tr key={posetilac.id}>
                            <td>{posetilac.ime}</td>
                            <td>{posetilac.prezime}</td>
                            <td>{posetilac.email}</td>
                            <td>{posetilac.telefon}</td>
                            <td>
                                <button className="btn btn-sm btn-warning" onClick={() => setPosetiociZaIzmenu(posetilac)}>Izmeni</button>
                                <button className="btn btn-sm btn-danger" onClick={() => obrisiPosetioca(posetilac.id)}>Obrisi</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PosetilacList;