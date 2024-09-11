import { useState } from "react";
import { fetchWithAuth } from "./utils";


export default function AddMemberForm({ workspaceId, setIsAddingMember }) {
    const [email, setEmail] = useState('');

    const handleAddMember = async () => {
        try {
            const response = await fetchWithAuth(`http://localhost:8000/api/workspaces/${workspaceId}/add-member/`, {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                alert('Member added successfully');
                setIsAddingMember(false);
            } else {
                const data = await response.json();
                console.log(data);
                alert(`Failed to add member: ${data['detail']}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="add-member-container">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter member's email" />
            <button onClick={handleAddMember}>Add Member</button>
        </div>
    );
}
