hadoop jar ./target/q4-1.0.jar edu.gatech.cse6242.Q4 ./data/large.tsv ./data/q4outputLarge
hadoop fs -getmerge ./data/q4outputLarge/ q4outputLarge.tsv
hadoop fs -rm -r ./data/q4outputLarge
