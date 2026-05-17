import { useEffect, useState } from "react";
import { getPosetioci } from "../services/posetilacService";
import PosetilacForma from "./PosetilacForma";

function PosetilacList() {
    const [posetioci, setPosetioci] = useState([]);
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

    return (
        <div className="mt-4">
            <PosetilacForma onPosetilacCreated={ucitajPosetioce} />

            <h2 className="mt-4">Posetioci</h2>
            {greska && <div className="alert alert-danger">{greska}</div>}

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Email</th>
                        <th>Telefon</th>
                    </tr>
                </thead>
                <tbody>
                    {posetioci.map((posetilac) => (
                        <tr key={posetilac.id}>
                            <td>{posetilac.ime}</td>
                            <td>{posetilac.prezime}</td>
                            <td>{posetilac.email}</td>
                            <td>{posetilac.telefon}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PosetilacList;