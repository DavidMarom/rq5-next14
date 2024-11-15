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

export async function updateCar(id: string, car: any) {
    try {
        const response = await http.put(`/cars/${id}`, car);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

export async function deleteCar(id: string) {
    try {
        const response = await http.delete(`/cars/${id}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

