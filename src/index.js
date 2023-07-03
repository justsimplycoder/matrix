import './styles/fonts.scss';
import './styles/main.scss';
import Table from './table.js';
import { multiplyMatrix } from './matrix.js';
import addButtonGenerateData from './test.js';

/* начальные размеры матриц 4x4 */
const table = new Table(4, 4, 4, 4);
/* Генерируем начальные матрицы */
table.insert();

// секция с элементами управления
const blockControl = document.querySelector('.control-matrix');
// вывод ошибок
const blockErrorMatrix = blockControl.querySelector('.control-matrix__error-info');
// переключение между матрицами A и B
const radioMatA = document.querySelector('#radio-matA');

const errorMatrix = (textError) => {
	blockControl.classList.add('control-matrix--theme-error');
	blockErrorMatrix.innerText = textError;
}

const validMatrix = () => {
	blockControl.classList.remove('control-matrix--theme-error');
	blockErrorMatrix.innerText = '';
}

/* Добавление строк */
blockControl.querySelector('#add-tr').addEventListener('click', () => {
	if((table.trA + 1) <= 10 && (table.trB + 1) <= 10){
		if(radioMatA.checked){
			++table.trA;
		} else {
			++table.trB;
		}
		table.insert();
		validMatrix();
	} else {
		errorMatrix("Число строк должно быть не больше 10")
	}
	return false;
});

/* Удаление строк */
blockControl.querySelector('#remove-tr').addEventListener('click', () => {
	if((table.trA - 1) >= 2 && (table.trB - 1) >= 2){
		if(radioMatA.checked){
			--table.trA;
		} else {
			--table.trB;
		}
		table.insert();
		validMatrix();
	} else {
		errorMatrix("Число строк должно быть не меньше 2")
	}
	return false;
});

/* Добавление столбцов */
blockControl.querySelector('#add-td').addEventListener('click', () => {
	if((table.tdA + 1) <= 10 && (table.tdB + 1) <= 10){
		if(radioMatA.checked){
			++table.tdA;
		} else {
			++table.tdB;
		}
		table.insert();
		validMatrix();
	} else {
		errorMatrix("Число столбцов должно быть не больше 10")
	}
	return false;
});

/* Удаление столбцов */
blockControl.querySelector('#remove-td').addEventListener('click', () => {
	if((table.tdA - 1) >= 2 && (table.tdB - 1) >= 2){
		if(radioMatA.checked){
			--table.tdA;
		} else {
			--table.tdB;
		}
		table.insert();
		validMatrix();
	} else {
		errorMatrix("Число столбцов должно быть не меньше 10")
	}
	return false;
});

/* Поменять матрицы местами */
blockControl.querySelector('#swap-matrix').addEventListener("click", () => {
	if(table.trA == table.tdA && table.trB == table.tdB && table.trA == table.trB){
		let matrixVal = table.getValMatrix();
		table.insert();
		table.setValMatrix(matrixVal[0], 'matB');
		table.setValMatrix(matrixVal[1], 'matA');
		validMatrix();
	} else {
		errorMatrix("Менять местами матрицы можно только одинакового размера с одинаковым числом строк и столбцов")
	}
});

/* Проверка заполнены ли значения матриц */
function isValueNotEmpty() {
	const inputsMatrix = document.querySelectorAll(".matrix__input:enabled");

	let isValid = true;
	for (let i = 0; i < inputsMatrix.length; i++) {
		if(inputsMatrix[i].value === '') {
			inputsMatrix[i].classList.add('matrix__input--theme-error');
			isValid = false;
		}
	}
	return isValid;
}

/* Перемножить матрицы */
blockControl.querySelector('#mult-matrix').addEventListener("click", () => {
	if( table.tdA == table.trB ){
		if (isValueNotEmpty() === true) {
			let valMatrixAB = table.getValMatrix();
			let result = multiplyMatrix(valMatrixAB[0], valMatrixAB[1]);
			table.setValMatrix(result, 'matC');
			return true;
		} else {
			errorMatrix("Значения полей перемножаемых матриц должны быть заполнены");
			return false;
		}
	} else {
		errorMatrix("Число столбцов первой матрицы должно равняться числу строк второй матрицы");
		return false;
	}
});

/* Очистить матрицы */
blockControl.querySelector('#clean-matrix').addEventListener("click", () => {
	table.insert();
	validMatrix();
});

// кнопки на боковой панели
const btns = document.querySelectorAll('.btn');

const errorInput = (textError, input) => {
	input.classList.add('matrix__input--theme-error'); // красная рамка
	input.focus(); // фокус всегда будет на инпуте пока не будет введено число
	errorMatrix(textError);
	btns.forEach(button => button.setAttribute("disabled", "disabled"))
};

const validInput = () => {
	validMatrix();
	btns.forEach(button => button.removeAttribute("disabled"))
};

/* Делегирование событий для ввода значений матриц */
document.querySelector('.page__matrix').onclick = function(event) {
	let input = event.target.closest('input');
	if (!input) return;
	validValue(input);
};

/*
	Подсветка колонки при фокусе на инпуте
	Валидация
	0. Должно быть введено целое число
	1. Число должно быть от -10 до 10
*/
function validValue(input) {
	input.oninput = function(){
		if (!Number.isInteger(Number(input.value))) { // введено не число
			errorInput("Введено не целое число", input)
			return;
		}

		if(input.value < -10 || input.value > 10){
			errorInput("Число должно быть от -10 до 10", input)
			return;
		}

		input.classList.remove('matrix__input--theme-error'); // красная рамка
		validInput();
	};
}

addButtonGenerateData();
