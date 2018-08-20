from flask import request, jsonify

from . import app, db
from .models import TodoList, Todo
from .schemas import todo_list_schema, todo_lists_schema, todo_schema, todos_schema, todo_search_schema


@app.route('/todo_lists', methods=['GET'])
def get_todo_lists():
    todo_lists = TodoList.query.all()
    result = todo_lists_schema.dump(todo_lists)
    return jsonify(result.data)


@app.route('/todo_lists/<int:pk>', methods=['GET'])
def get_todo_list(pk):
    todo_list = TodoList.query.get_or_404(pk)
    result = todo_list_schema.dump(todo_list)
    return jsonify(result.data)


@app.route('/todo_lists/<int:pk>', methods=['PATCH'])
def update_todo_list(pk):
    todo_list = TodoList.query.get_or_404(pk)
    json_data = request.get_json()
    updated_todo_list, errors = todo_list_schema.load(json_data, partial=True)
    if errors:
        return jsonify(errors), 422

    if updated_todo_list.name is not None:
        todo_list.name = updated_todo_list.name

    db.session.add(todo_list)
    db.session.commit()
    result = todo_list_schema.dump(todo_list)
    return jsonify(result.data), 200

@app.route('/todo_lists/<int:pk>', methods=['DELETE'])
def delete_todo_list(pk):
    todo_list = TodoList.query.get_or_404(pk)
    db.session.delete(todo_list)
    db.session.commit()
    return '', 204


@app.route('/todo_lists', methods=['POST'])
def create_todo_list():
    json_data = request.get_json()
    todo_list, errors = todo_list_schema.load(json_data)
    if errors:
        return jsonify(errors), 422

    db.session.add(todo_list)
    db.session.commit()
    result = todo_list_schema.dump(todo_list)
    return jsonify(result.data), 201


@app.route('/todo/<int:pk>', methods=['GET'])
def get_todo(pk):
    todo = Todo.query.get_or_404(pk)
    result = todo_schema.dump(todo)
    return jsonify(result.data)


@app.route('/todo/<int:pk>', methods=['PATCH'])
def update_todo(pk):
    todo = Todo.query.get_or_404(pk)
    json_data = request.get_json()
    updated_todo, errors = todo_schema.load(json_data, partial=True)
    if errors:
        return jsonify(errors), 422

    if updated_todo.title is not None:
        todo.title = updated_todo.title
    if updated_todo.completed is not None:
        todo.completed = updated_todo.completed

    db.session.add(todo)
    db.session.commit()
    result = todo_schema.dump(todo)
    return jsonify(result.data), 200


@app.route('/todo/<int:pk>', methods=['DELETE'])
def delete_todo(pk):
    todo = Todo.query.get_or_404(pk)
    db.session.delete(todo)
    db.session.commit()
    return '', 204

@app.route('/todos', methods=['GET'])
def get_todos():
    todos = Todo.query.all()
    result = todos_schema.dump(todos)
    return jsonify(result.data)

@app.route('/todos', methods=['POST'])
def search_todos():
    todo_All = []
    json_data = request.get_json()
    todo_item, errors = todo_search_schema.load(json_data)
    if errors:
        return jsonify(errors), 422
    todos = Todo.query.all()
    for todo in todos:
        print("match "+todo.title+" and "+todo_item.title)
        if todo.title == todo_item.title:
            todo_All.append(todo)
    
    result = todos_schema.dump(todo_All)
    return jsonify(result.data), 200

@app.route('/todo', methods=['POST'])
def create_todo():
    json_data = request.get_json()
    todo, errors = todo_schema.load(json_data)
    if errors:
        return jsonify(errors), 422

    todo_list = TodoList.query.get(todo.todo_list_id)
    if todo_list is None:
        return jsonify({"error": "TodoList with ID %s could not be found."
                                 % todo.todo_list_id}), 400

    db.session.add(todo)
    db.session.commit()
    result = todo_schema.dump(todo)
    return jsonify(result.data), 201
