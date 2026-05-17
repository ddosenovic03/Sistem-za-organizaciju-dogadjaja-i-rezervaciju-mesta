import { useEffect, useState } from "react";
import { getOrganizatori } from "../services/organizatorService";
import OrganizatorForma from "./OrganizatorForma";

function OrganizatorList() {
    const [organizatori, setOrganizatori] = useState([]);
    const [greska, setGreska] = useState("");
    
    async function ucitajOrganizatore() {
        try {
            const data = await getOrganizatori();
            setOrganizatori(data);
            setGreska("");
        } catch (error) {
            setGreska(error.message);
        }
    }
    useEffect(() => { ucitajOrganizatore(); }, []);

    return (
        <div className="mt-4">
            <OrganizatorForma onOrganizatorCreated={ucitajOrganizatore} />
            
            <h2 className="mt-4">Organizatori</h2>
            {greska && <div className="alert alert-danger">{greska}</div>}

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Email</th>
                        <th>Kompanija</th>
                    </tr>
                </thead>
                <tbody>
                    {organizatori.map(o => (
                        <tr key={o.id}>
                            <td>{o.ime}</td>
                            <td>{o.email}</td>
                            <td>{o.kompanija}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrganizatorList;