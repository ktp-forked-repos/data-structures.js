import { BST } from '../binary-search-tree/binary-search-tree';

export class AdjacencyList {
  constructor(isDiGraph) {
    this.diGraph = isDiGraph;
    this.vertices = new Map();
  }

  /**
   * It adds node to the map and assign an empty list
   * If the node is already added to the map, then nothing happens
   * @param {string|number} node
   */
  addNode(node) {
    if (!this.vertices.get(node)) {
      this.vertices.set(node, new BST);
    }
  }

  /**
   * It removes the node from the map
   * @param {string|number} node
   */
  removeNode(node) {
    // Remove all the vertices formed by this node
    this.vertices.forEach((val, key) => {
      this.removeEdge(key, node);
    });

    // finally remove the node
    this.vertices.delete(node);
  }

  /**
   * It adds an edge from vertex fromVertex to vertex toVertex
   * If the verticies are not present then it first adds the missing vertex
   * If the graph is a diGraph then it will add edge between toVertex and fromVertex
   *
   * @param {string|number} fromVertex
   * @param {string|number} toVertex
   * @param {number} weight
   */
  addEdge(fromVertex, toVertex, weight) {
    if (!this.vertices.has(fromVertex)) {
      this.addNode(fromVertex);
    }

    if (!this.vertices.has(toVertex)) {
      this.addNode(toVertex);
    }

    this.vertices.get(fromVertex).insert(toVertex, { weight });

    if (!this.diGraph) {
      this.vertices.get(toVertex).insert(fromVertex, { weight });
    }
  }

  /**
   * Remove an edge from start vertex to end vertex
   * @param {string|number} fromVertex
   * @param {string|number} toVertex
   */
  removeEdge(fromVertex, toVertex) {
    if (this.vertices.has(fromVertex)) {
      const deleteEdge = this.vertices.get(fromVertex).delete(toVertex);
      if (deleteEdge && deleteEdge.constructor === Error) {
        return new Error(`No edge present between ${fromVertex} and ${toVertex}`);
      }
    } else {
      return new Error(`No edge present between ${fromVertex} and ${toVertex}`);
    }

    // if the graph is undirected and id its the first call to the removeEdge method
    // set stopRecursion to true and call removeEdge method again by
    // swapping the parameters.
    if (!this.diGraph && !this.removeEdge.stopRecursion) {
      this.removeEdge.stopRecursion = true;
      this.removeEdge(toVertex, fromVertex);
    } else {
      if (this.removeEdge.stopRecursion) {
        this.removeEdge.stopRecursion = undefined;
      }
    }
  }

  /**
   * It returns the weight of the edge. If the edge is not found then it returns undefined
   * @param {string|number} fromVertex
   * @param {string|number} toVertex
   */
  getEdgeWeight(fromVertex, toVertex) {
    let weight;
    if (this.vertices.has(fromVertex)) {
      const lookup = this.vertices.get(fromVertex).lookup(toVertex);
      weight = lookup.hasVal ? lookup.currentNode.details.weight : void 0;
    }
    return weight ? weight : new Error(`Edge not found between ${fromVertex} and ${toVertex}`);
  }
}