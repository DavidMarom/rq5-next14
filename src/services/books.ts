import http from "@/services/http";

export async function getAllBooks() {
    try {
        const response = await http.get("/books");
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

export async function getBookById(id: string) {
    try {
        const response = await http.get(`/books/${id}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

export async function createBook(book: any) {
    try {
        const response = await http.post("/books", book);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

export async function updateBook(id: string, book: any) {
    try {
        const response = await http.put(`/books/${id}`, book);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

export async function deleteBook(id: string) {
    console.log(id);
    // try {
    //     const response = await http.delete(`/books/${id}`);
    //     return response.data;
    // }
    // catch (error) {
    //     console.error(error);
    // }
}

