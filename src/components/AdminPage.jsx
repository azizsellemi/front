import React, { useEffect, useState } from "react";

const AdminPage = () => {
  const [users, setUsers] = useState([]); // Liste des utilisateurs
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [editingUser, setEditingUser] = useState(null); // Utilisateur en cours d'édition
  const [formData, setFormData] = useState({ name: "", email: "", password: "" }); // Données du formulaire
  const [error, setError] = useState(""); // Gestion des erreurs

  // Fonction pour récupérer les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/student/get");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des utilisateurs");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError("Problème de récupération des utilisateurs");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Fonction pour supprimer un utilisateur
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/student/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'utilisateur");
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      setError("Erreur lors de la suppression de l'utilisateur");
      console.error(error);
    }
  };

  // Fonction pour ouvrir le formulaire d'édition d'un utilisateur
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, password: "" });
  };

  // Fonction pour gérer les changements dans le formulaire
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fonction pour soumettre le formulaire de modification
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/student/update/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'utilisateur");
      }
      const updatedUser = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setEditingUser(null); // Fermer le formulaire d'édition
    } catch (error) {
      setError("Erreur lors de l'édition de l'utilisateur");
      console.error(error);
    }
  };

  // Affichage du message de chargement ou erreur
  if (loading) {
    return <div>Chargement des utilisateurs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1>Liste des utilisateurs</h1>
      <div style={styles.buttonContainer}>
        <a style={styles.button} className="text-red-600 hover:underline hover:underline-offset-4" href="/signup">
          Ajouter un utilisateur
        </a>
      </div>

      {editingUser && (
        <div style={styles.formContainer}>
          <h2>Modifier l'utilisateur</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label>Nom :</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Email :</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Mot de passe :</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button}>Mettre à jour</button>
            <button
              type="button"
              onClick={() => setEditingUser(null)}
              style={{ ...styles.button, backgroundColor: "#f44336" }}
            >
              Annuler
            </button>
          </form>
        </div>
      )}

      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user)} style={styles.button}>Modifier</button>
                <button
                  onClick={() => handleDelete(user.id)}
                  style={{ ...styles.button, backgroundColor: "#f44336" }}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    width: '80%',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  table: {
    width: '100%',
    marginTop: '20px',
    borderCollapse: 'collapse',
    textAlign: 'left',
    border: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
  },
  formContainer: {
    marginBottom: '20px',
    backgroundColor: '#f1f1f1',
    padding: '20px',
    borderRadius: '5px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  buttonContainer: {
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    margin: '0 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
};

export default AdminPage;