import http from "@/services/http";

export async function getAllCars() {
    try {
        const response = await http.get("/cars");
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

export async function createCar(car: any) {
    try {
        const response = await http.post("/cars", car);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

// export async function updateBook(id: string, book: any) {
//     try {
//         const response = await http.put(`/books/${id}`, book);
//         return response.data;
//     }
//     catch (error) {
//         console.error(error);
//     }
// }

export async function deleteCar(id: string) {
    try {
        const response = await http.delete(`/cars/${id}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

