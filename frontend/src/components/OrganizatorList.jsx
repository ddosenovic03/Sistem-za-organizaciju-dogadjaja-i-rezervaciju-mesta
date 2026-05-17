import { useEffect, useState } from "react";
import { getOrganizatori, deleteOrganizator } from "../services/organizatorService";
import OrganizatorForma from "./OrganizatorForma";

function OrganizatorList() {
    const [organizatori, setOrganizatori] = useState([]);
    const [organizatorZaIzmenu, setOrganizatorZaIzmenu] = useState(null);
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

    async function obrisiOrganizatora(id) {
        try {
            await deleteOrganizator(id);
            ucitajOrganizatore();
            setGreska("");
        } catch (error) {
            setGreska(error.message);
        }
    }

    return (
        <div className="mt-4">
            <OrganizatorForma 
                onOrganizatorCreated={ucitajOrganizatore} 
                organizatorZaIzmenu={organizatorZaIzmenu} 
                setOrganizatorZaIzmenu={setOrganizatorZaIzmenu} />
            
            <h2 className="mt-4">Organizatori</h2>
            {greska && <div className="alert alert-danger">{greska}</div>}

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Email</th>
                        <th>Kompanija</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {organizatori.map(o => (
                        <tr key={o.id}>
                            <td>{o.ime}</td>
                            <td>{o.email}</td>
                            <td>{o.kompanija}</td>
                            <td>
                                <button className="btn btn-warning btn-sm" onClick={() => setOrganizatorZaIzmenu(o)}>Izmeni</button>
                                <button className="btn btn-danger btn-sm" onClick={() => obrisiOrganizatora(o.id)}>Obrisi</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrganizatorList;