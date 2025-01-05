import {collection, onSnapshot, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import {db} from "../services/firebase";

// Função para ouvir mudanças no cardápio em tempo real
export function listenToCardapio(callback) {
  const menuCollection = collection(db, "menu");

  // Adiciona o listener
  const unsubscribe = onSnapshot(menuCollection, (snapshot) => {
    const cardapio = snapshot.docs.map((doc) => ({
      id: doc.id, // ID do documento
      ...doc.data(), // Dados do documento
    }));

    // Executa o callback com os dados atualizados
    callback(cardapio);
  });

  // Retorna a função para cancelar a inscrição (evita vazamentos de memória)
  return unsubscribe;
}

// Função para atualizar o status de um item
export async function updateItem(itemId, status, price) {
  const itemRef = doc(db, "menu", itemId);
  await updateDoc(itemRef, { available: status, price: price });
}

// Função para criar um novo item no cardápio
export async function createItem(item) {
  const itemRef = await addDoc(collection(db, "menu"), item);
  return itemRef.id;
}

// Função para deletar um item do cardápio
export async function deleteItem(itemId) {
  const itemRef = doc(db, "menu", itemId);
  await deleteDoc(itemRef);
}


export function listenToOrders(callback) {
  const menuCollection = collection(db, "pedidos");

  // Adiciona o listener
  const unsubscribe = onSnapshot(menuCollection, (snapshot) => {
    const pedidos = snapshot.docs.map((doc) => ({
      id: doc.id, // ID do documento
      ...doc.data(), // Dados do documento
    }));

    // Executa o callback com os dados atualizados
    callback(pedidos);
  });

  // Retorna a função para cancelar a inscrição (evita vazamentos de memória)
  return unsubscribe;
}


// Função para adicionar um novo pedido
export async function createOrder(item) {
  const itemRef = await addDoc(collection(db, "pedidos"), item);
  return itemRef.id;
}