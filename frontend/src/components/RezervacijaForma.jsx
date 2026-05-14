import { useState } from "react";
import { createRezervacija } from "../services/rezervacijaService";

function RezervacijaForma({ dogadjajId, onRezervacijaCreated }) {
    const [posetilacId, setPosetilacId] = useState("");
    const [brMesta, setBrMesta] = useState("");
    const [poruka, setPoruka] = useState("");
    const [greska, setGreska] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await createRezervacija({ dogadjajId: Number(dogadjajId), posetilacId: Number(posetilacId), brMesta: Number(brMesta) })
            setPoruka("Rezervacija uspešno kreirana!");
            setGreska("");
            setPosetilacId("");
            setBrMesta("");

            onRezervacijaCreated();
        } catch (error) {
            setGreska(error.message);
            setPoruka("");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="d-flex gap-2">
            <div>
                <input type="number" placeholder="ID posetioca" className="form-control" value={posetilacId} onChange={e => setPosetilacId(e.target.value)} required />
                <input type="number" placeholder="Broj mesta" className="form-control" value={brMesta} onChange={e => setBrMesta(e.target.value)} required />
                <button type="submit" className="btn btn-success">Rezerviši</button>
            </div>

            <div>
                {poruka && <div className="alert alert-success mt-2">{poruka}</div>}
                {greska && <div className="alert alert-danger mt-2">{greska}</div>}
            </div>
        </form>

    );
}

export default RezervacijaForma;