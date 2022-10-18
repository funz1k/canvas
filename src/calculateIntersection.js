export default function calculateIntersection(array, x3, y3, x4, y4) {
    const result = []

    for (let index = 0; index < array.length; index++) {
        const { firsttX, firstY, secondX, secondY } = array[index];


        const d1 = (firsttX - secondX) * (y3 - y4);
        const d2 = (firstY - secondY) * (x3 - x4);
        const d = (d1) - (d2);

        const u1 = (firsttX * secondY - firstY * secondX);
        const u4 = (x3 * y4 - y3 * x4);

        const u2x = x3 - x4;
        const u3x = firsttX - secondX;
        const u2y = y3 - y4;
        const u3y = firstY - secondY;

        const px = (u1 * u2x - u3x * u4) / d;
        const py = (u1 * u2y - u3y * u4) / d;

        const p = { x: px, y: py };

        if (firsttX <= px && secondX >= px && x3 <= px && x4 >= px || firstY <= py && secondY >= py && y3 <= py && y4 >= py) {
            result.push(p)
        }
    }

    return result
}
