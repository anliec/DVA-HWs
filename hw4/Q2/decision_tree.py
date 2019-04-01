from util import entropy, information_gain, partition_classes
import numpy as np 
import ast


class DecisionTree(object):
    def __init__(self):
        # Initializing the tree as an empty dictionary or list, as preferred
        # self.tree = []
        self.tree = {}
        self.raw_to_partial_col = []
        pass

    def learn(self, X, y):
        # TODO: Train the decision tree (self.tree) using the the sample X and labels y
        # You will have to make use of the functions in utils.py to train the tree
        
        # One possible way of implementing the tree:
        #    Each node in self.tree could be in the form of a dictionary:
        #       https://docs.python.org/2/library/stdtypes.html#mapping-types-dict
        #    For example, a non-leaf node with two children can have a 'left' key and  a 
        #    'right' key. You can add more keys which might help in classification
        #    (eg. split attribute and split value)
        self.build_tree(self.tree, X, y, 10, column_to_use=list(range(len(X[0]))),
                        reuse_label=False, min_sample=5)

    def build_tree(self, node: dict, x, y, max_depth: int, column_to_use: list, reuse_label=False, min_sample=2):
        if max_depth == 0 or len(y) <= min_sample or len(column_to_use) == 0:
            node['type'] = 'leaf'
            node['value'] = np.bincount(y).argmax()
            return
        else:
            max_information_gain = 0.0
            split_column = None
            split_value = None

            for c in column_to_use:
                vals = [row[c] for row in x]
                vals = set(vals)
                for v in vals:
                    _, _, y_left, y_right = partition_classes(x, y, c, v)
                    gain = information_gain(y, [y_left, y_right])
                    if gain > max_information_gain and len(y_left) > 0 and len(y_right) > 0:
                        max_information_gain = gain
                        split_column = c
                        split_value = v

            if split_column is None or split_value is None:
                node['type'] = 'leaf'
                node['value'] = np.bincount(y).argmax()
                return

            node['type'] = "branch"
            node['split_attribute'] = split_column
            node['split_value'] = split_value
            node['left'] = {}
            node['right'] = {}

            x_left, x_right, y_left, y_right = partition_classes(x, y, split_column, split_value)

            if not reuse_label:
                new_column_to_use = [c for c in column_to_use if c != split_column]
            else:
                new_column_to_use = column_to_use

            self.build_tree(node['left'], x_left, y_left, max_depth=max_depth-1, column_to_use=new_column_to_use,
                            reuse_label=reuse_label, min_sample=min_sample)

            self.build_tree(node['right'], x_right, y_right, max_depth=max_depth - 1, column_to_use=new_column_to_use,
                            reuse_label=reuse_label, min_sample=min_sample)

    def classify(self, record):
        # TODO: classify the record using self.tree and return the predicted label
        row = []
        for y in self.raw_to_partial_col:
            row.append(record[y])
        record = row
        node = self.tree

        while node['type'] != 'leaf':
            if record[node['split_attribute']] <= node['split_value']:
                node = node['left']
            else:
                node = node['right']

        return node['value']
