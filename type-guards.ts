interface Circle {
	kind: "circle";
	radius: number;
}

interface Square {
	kind: "square";
	side: number;
}

type Shape = Circle | Square;

function isCircle(shape: Shape) {
	return shape.kind === "circle";
}

function isSquare(shape: Shape) {
	return shape.kind === "square";
}

function calculateArea(shape: Shape) {
	if (isCircle(shape)) {
		return Math.PI * shape.radius ** 2;
	}

	return shape.side ** 2;
}

function calculatePerimeter(shape: Shape) {
	if (isCircle(shape)) {
		return shape.radius * Math.PI * 2;
	}

	return shape.side * 4;
}
